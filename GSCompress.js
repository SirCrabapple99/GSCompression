const GSAlphabet = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ `;
let GSDictionary = [];

const example = 'The quick brown fox jumped over the lazy dog';

function GSGenDictionary() {
    for (let i = 0; i < 128; i++) {
        GSDictionary.push('reserved');
    };
    for (let i in GSAlphabet) {
        for (let x in GSAlphabet) {
            GSDictionary.push(GSAlphabet[i] + GSAlphabet[x]);
        };
    };
};
GSGenDictionary();

// get match with most repeats
function GSGetBest(string, min) {
    // loop over text and grab pairs of 2
    let searched = [];
    for (let i = 0; i < string.length; i++) {
        if (string[i + 1] == undefined) {
            break;
        };
        searched.push(string[i] + string[i + 1]);
    };
    
    // turn into a string so .search() can be used but seperate each pair with a character so that they don't get mixed together
    let matches = '';
    for (let i in searched) {
        matches += String.fromCharCode(99999)+searched[i];
    };

    // find the amount of times each match appears
    let best = [];
    for (let i in searched) {
        let re = new RegExp(searched[i], 'g');
        best.push([searched[i], matches.match(re).length]);
    };
    
    // remove matches that appear < min times
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
}

// encode a string
function GSEncode(string, min) {
    // replace best matches with character
    let newString = string; 
    let encoded = string;
    let tempDict = [];
    for (let i = 0; i == 0;) {
        if (GSGetBest(newString, min) == undefined) {
            break;
        };
        tempDict.push(GSGetBest(newString, min));
        let re = new RegExp(tempDict[tempDict.length - 1][0], 'g');
        newString = newString.replaceAll(re, '');
        s = String.fromCharCode(GSDictionary.indexOf(tempDict[tempDict.length - 1][0]))
        encoded = encoded.replaceAll(re, String.fromCharCode(GSDictionary.indexOf(tempDict[tempDict.length - 1][0])));
    };
    return encoded;
};

// decode a string
function GSDecode(string) {
    let newString = string;
    let decoded = string;
    for (let i = 0; i < string.length; i++) {
        // make sure character isn't reserved
        if (string.charCodeAt(i) >= 128) {
            let re = new RegExp(newString[i], 'g');
            decoded = decoded.replaceAll(re, GSDictionary[string.charCodeAt(i)]);
        };
    };
    return decoded;
};
