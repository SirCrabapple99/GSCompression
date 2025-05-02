// goes through every letter, creates a group of it and the next (size - 1) letters, and returns an array structured [[group, (pos of first charachter):size], [group, (pos of first character):size], [group, (pos of first character):size]]
// example output: [['abc', 0:3], ['bcd', 1:3], ['cde', 2:3]]
// example usage: GSSearch('The quick brown fox jumped over the lazy dog', 3)
function GSSearch(string, size) {
    if (!string || !size) {console.error('missing 1+ required parameters of GSSearch(string, size)'); return;};
    let searched = [];
    for (let i = 0; i < string.length; i++) {
        // make sure it only picks complete groups of (size)
        for (let x = 0; x < size; x++) {
            if (string.at(i + x) == undefined) {
                return searched;
            };
        };
        // add group to list as well as it's position in the text (to check if it is intersecting with other groups later)
        searched.push([string.at(i), i+':'+size]);
        for (let x = 1; x < size; x++) {
            searched[i][0] += string.at(i + x);
        };
    };
    return searched;
};
// count how many there are of each match and returns all higher than the defined minimum, outputs an array structured [[match, amount], [match, amount], [match, amount]]
// example output: [['abc', 4], ['qrs', 4], ['tuv', 2]]
// example usage: GSMatch(GSSearch('The quick brown fox jumped over the lazy dog', 3), 3)
function GSMatch(searched, min) {
    if (!searched || !min) {console.error('missing 1+ required parameters of GSMatch(searched, min)'); return;};
    let matches = [];
    for (let i in searched) {
        let newMatch = -1;
        // check if match is new
        for (let x in matches) {
            if (matches[x][0] == searched[i][0]) {
                newMatch = x;
                x += matches.length + 1;
            };
        };
        // if match is new, add it to match list, otherwise increase it's value
        let re = new RegExp(searched[i][0], 'g');
        if (newMatch == -1) {
            matches.push([searched[i][0], searched[i][0].match(re).length]);
        } else {
            matches[newMatch][1] += 1;
        };
    };
    // only return matches that repeat >= min times
    for (let i = 0; i < matches.length; i++) {
        if (matches[i][1] < min) {
            matches.splice(i, 1);
            i -= 1;
        };
    };
    return matches;
};

// grab match with most instances
// example usage: GSBest(GSMatch(GSSearch(tempstring, 3), 2))
function GSBest(matchList) {
    if (!matchList) {console.error('missing 1+ required parameters of GSBest(matchList)'); return;};
    let highest = [];
    for (let i in matchList) {
        highest.push(matchList[i]);
    };
    highest.sort();
    return highest[0];
};

// encode top matches and store in dictionary
// example usage: GSWriteDict(GSBest(GSMatch(GSSearch(tempstring, 3), 2)))
let GSDictionary = [];
function GSWriteDict(input) {
    if (!input) {console.error('missing 1+ required parameters of GSWriteDict(input)'); return;};
    GSDictionary.push([String.fromCharCode(GSDictionary.length), input[0]]);
};

// output text
// example usage: GSOutput('The quick brown fox jumped over the lazy dog', 1)
function GSOutput(string, aa) {
    if (!string) {console.error('missing 1+ required parameters of GSOutput(string)'); return;};
    if (aa == 1) {
    document.getElementById('GSOutput').innerHTML = string;
    navigator.clipboard.writeText(string);
    return
    };
    //document.getElementById('GSOutput').innerHTML = GSDictionary + ':::' + string;
    navigator.clipboard.writeText(GSDictionary + ':::' + string);
};
// encode data
// example usage: GSEncode('The quick brown fox jumped over the lazy dog', 2)
function GSEncode(string, groupsize) {
    if (!string || !groupsize) {console.error('missing 1+ required parameters of GSWriteDict(string, groupsize)'); return;};
    GSDictionary = [];
    let newString = string;
    let finalString = string;
    for (let i = 0; i > -1;) {
        if (GSDictionary.length >= 255 || !GSBest(GSMatch(GSSearch(newString, groupsize), 2))) {
            return;
        } else {
        // only using 1 byte characters for now, maybe I will implement 2 byte characters later
            GSWriteDict(GSBest(GSMatch(GSSearch(newString, groupsize), 2)));
            let f = new RegExp(GSDictionary[GSDictionary.length - 1][1], 'g');
            newString = newString.replaceAll(f, '');
            finalString = finalString.replaceAll(f, GSDictionary[GSDictionary.length - 1][0]);
        };
    };
    GSOutput(finalString);
};

// decode encoded text
// example usage: GSDecode('The quick brown fox jumped over the lazy dog')
function GSDecode(string) {
    if (!string) {console.error('missing 1+ required parameters of GSDecode(string)'); return;};
    GSDictionary = [];
    let s = '';
    // array to store each group [a, 1, b, 3, c, 456];
    let b = [''];
    // put dictionary in array
    for (let i = 0; i < string.length; i++) {
        if (!(string.at(i) == ':' && string.at(i + 1) == ':' && string.at(i + 2) == ':')) {
            s += string.at(i);
        } else {
            s += ':::'
            break;
        };
        if (string.at(i) != ',') {
            b[b.length - 1] += string.at(i);
        } else {
            b.push('')
        };
    };
    // push to dictionary
    for (let i = 0; i < b.length / 2; i++) {
        GSDictionary.push([b[i * 2], b[(i * 2) + 1]]);
    };
    // grab string without dictionary
    let final = string.replace(s, '');
    // replace all the bytes according to the dictionary
    for (let i = 0; i < GSDictionary.length; i++) {
        let re = new RegExp(GSDictionary[i][0], 'g');
        final = final.replaceAll(re, GSDictionary[i][1]);
    };
    GSOutput(final, 1);
};
