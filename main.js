// set up character pairs

// define accepted characters, ex: abc[special characters]ABC
let GSChar = 'abcdefghijklmnopqrstuvwxyz !ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// convert into array
GSChar = GSChar.split('');
// array for every possible character pair
let GSCombos = [];
// array for single characters
let GSUnicode = [[], []];
// just to make the code a little smaller
const GSCharNumber = GSChar.length - 26;
// generate character pairs
function create() {
        for (let i = 0; i < GSCharNumber; i++) {
            for (let x = 0; x < GSCharNumber; x++) {
                GSCombos.push(GSChar[i] + GSChar[x + 26]);
            };
        };
        for (let i = 0; i < GSCharNumber; i++) {
            for (let x = 0; x < GSCharNumber; x++) {
                GSCombos.push(GSChar[x + 26] + GSChar[i]);
            };
        };
        for (let i = 0; i < GSCharNumber; i++) {
            for (let x = 0; x < GSCharNumber; x++) {
                GSCombos.push(GSChar[i] + GSChar[x]);
            };
        };
        for (let i = 0; i < GSCharNumber; i++) {
            for (let x = 0; x < GSCharNumber; x++) {
                GSCombos.push(GSChar[i + 26] + GSChar[x + 26]);
            };
        };
    };
// characters from https://raw.githubusercontent.com/bits/UTF-8-Unicode-Test-Documents/refs/heads/master/UTF-8_sequence_separated/utf8_sequence_0-0x10ffff_assigned_printable.txt
function convert() {
        for (let i = 0; i < GSCombos.length; i++) {
            GSUnicode[0].push(GSUnicodeData.at(i));
            GSUnicode[1].push(GSCombos[i]);
        };
     // alert(GSUnicode[0][0])
    };
create();
convert();

// encoding
function GSEncode(input) {
// string to store output
        let output = '';
// repeatedly add the converted pair to the end of sampleAdjusted
        for (let i = 0; i < Math.floor(input.length / 2); i++) {
            output = output.concat('', GSUnicode[0][GSCombos.indexOf(input.at(i * 2) + input.at((i * 2) + 1))]);
        };
// check if even or odd
        let f = JSON.stringify(input.length / 2).at(-1);
        if (f % 2 !== 0) {
            output = output.concat('', GSUnicode[0][GSCombos.indexOf(input.at(-1) + ' ')]);
        };
        return output;
    };

// decoding
function GSDecode(input) {
// string to store output
        let output = '';
// repeatedly add the converted pair to the end of sampleAdjusted
        for (let i = 0; i < input.length; i++) {
            output = output.concat('', GSUnicode[1][GSUnicode[0].indexOf(input.at(i))]);
        };
        if (output.at(-1) == ' ') {
            output.split(0, -1);
        }
        return output;
    };
window.alert(GSDecode(GSEncode('Hello World! ')));