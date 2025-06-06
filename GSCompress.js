const example = 'TOBEORNOTTOBETOBEORNOTTOBE'
const b = new TextDecoder('iso-8859-1');
let GSASCII = `	

 !"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_\\\`abcdefghijklmnopqrstuvwxyz{|}~`;
let GSASCIIE = '€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþ';

/* // define ascii
function GSAE() {
    // basic
    let x = [];
    for (let i = 0; i < 128; i++) {
        x.push(i);
    };
    GSASCII = b.decode(new Uint8Array(x));
    // extended
    x = [];
    for (let i = 128; i < 256; i++) {
        x.push(i);
    };
    GSASCIIE = b.decode(new Uint8Array(x));
};

GSAE(); */
function GSGrab(string, len, min) {
    // grab
    let grabbed = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i + len - 1] == undefined) {
            break;
        };
        let f = '';
        for (let x = 0; x < len; x++) {
            f += string[i + x];
        };
        grabbed.push(f);
    };

    // check the amount of times each match appears
    let best = [];
    for (let i in grabbed) {
        let re = new RegExp(grabbed[i], 'g');
        best.push([grabbed[i], string.match(re).length]);
    };

    // remove matches that appear < min times or contain characters not in the alphabet
    for (let i = 0; i < best.length; i++) {
        if (best[i][1] < min) {
            best.splice(i, 1);
            i -= 1;
        };
    };
    // sort matches
    best.sort((a, b) => a[1] - b[1]);
    best.reverse();
    // return best
    return best[0];
};

let encoded
// len = length of first pass, min = min matches, full is how long the second pass is (adds to len)
function GSEncode(string, len, min, full) {
    let newString = string.replace(/./g, '\$&');
    let encoded = string;
    let temp;
    for (let i = 0; i < 126; i++) {
        // temporary solution because I can't figure out another way to do this
        try {
            GSGrab(newString, len, min); 
        } catch(error) {
            // declare group length at beginning (temporary)
            if (full) {
                encoded = len + (len - full) + 'ÿ' + encoded;
            };
            return encoded;
        };
        temp = GSGrab(newString, len, min);
        newString = newString.replaceAll(new RegExp(temp[0], 'g'), '');
        encoded = encoded.replace(new RegExp(temp[0]), String.fromCharCode(9999));
        encoded = encoded.replaceAll(new RegExp(temp[0], 'g'), GSASCIIE[i]);
        encoded = encoded.replace(new RegExp(String.fromCharCode(9999)), temp[0] + GSASCIIE[i]);
        navigator.clipboard.writeText(encoded);
    };
};

function GSDecode(string) {
    let full = string.search(/ÿ/g);
    let size = [2];
    if (full != -1) {
        size = [];
        for (let i = 0; i < full - 1; i++) {
            size.push(string[i]);
        };
    };

    let dict = [];
    let newString = string;
    let decoded = string;
    for (let i in size) {
        for (let x in string) {
            if (GSASCIIE.indexOf(string[x]) != -1 && dict.indexOf(string[x]) == -1) { 
                dict.push(newString.slice(x - size[i], x), string[x]);
            };
        };
    };
    // replace characters
    for (let i = 0; i < dict.length / 2; i++) {
        newString = newString.replace(new RegExp(dict[i * 2] + dict[i * 2 + 1]), '');
        newString = newString.replaceAll(new RegExp(dict[i * 2 + 1], 'g'), '');
        decoded = decoded.replace(new RegExp(dict[i * 2]), '');
        decoded = decoded.replaceAll(new RegExp(dict[i * 2 + 1], 'g'), dict[i * 2]);   
    };
    
    return decoded;
};

GSEncode(`TOBEORNOTTOBETOBEORNOTTOBE\$`, 2, 3)
