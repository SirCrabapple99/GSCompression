// set up character pairs

// define accepted characters
let char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// convert into array
let options = char.slice('');
// array for every possible character pair
let combos = [];
// array for single characters
let oneletter = [];
// generate character pairs
function create() {
    for (let i = 0; i < 26; i++) {
        for (let x = 0; x < 26; x++) {
            combos[combos.length] = options[i] + options[x + 26];
        };
    };
    for (let i = 0; i < 26; i++) {
        for (let x = 0; x < 26; x++) {
            combos[combos.length] = options[x + 26] + options[i];
        };
    };
    for (let i = 0; i < 26; i++) {
        for (let x = 0; x < 26; x++) {
            combos[combos.length] = options[i] + options[x];
        };
    };
    for (let i = 0; i < 26; i++) {
        for (let x = 0; x < 26; x++) {
            combos[combos.length] = options[i + 26] + options[x + 26];
        };
    };
};
// convert pairs into one character, characters from https://raw.githubusercontent.com/bits/UTF-8-Unicode-Test-Documents/refs/heads/master/UTF-8_sequence_unseparated/utf8_sequence_0-0xffff_assigned_printable_unseparated.txt
function convert() {
    for (let i = 0; i < combos.length; i++) {
        oneletter[i] = unicodeChars.charAt(i);
    };
};
create();
convert();

// convert input

// string to store input
let sampleInput = "Hello World";
// remove spaces (temp)
sampleInput = sampleInput.replaceAll(' ', '');
// tring to store converted input
let sampleAdjusted = '';
// repeatedly add the converted pair to the end of sampleAdjusted
for (let i = 0; i < Math.floor(sampleInput.length / 2); i++) {
    sampleAdjusted = sampleAdjusted.concat('', oneletter[combos.indexOf(sampleInput.slice('')[i * 2] + sampleInput.slice('')[(i * 2) + 1])]);
};
// check if even or odd (I forgot how to do it quickly)
let f = JSON.stringify(sampleInput.length).at(-1)
if (f == 1 || f == 3 || f == 5 || f == 7 || f == 9) {
    sampleAdjusted = sampleAdjusted.concat('', sampleInput.at(-1));
}
navigator.clipboard.writeText(sampleAdjusted);
window.alert(sampleAdjusted);
