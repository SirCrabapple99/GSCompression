let GSDictionary = [];
const tempstring = `The quick brown fox jumped over the lazy dog`;
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
    for (let i = 0; i < searched.length; i++) {
        let newMatch = -1;
        // check if match is new
        for (let x = 0; x < matches.length; x++) {
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
// check which matches are the best to keep and which have intersecting letters, not optimized for best possible matches
function GSBest(topMatches, searched) {
    if (!topMatches || !searched) {console.error('missing 1+ required parameters of GSBest(topMatches, searched)'); return;};
    // grabbing the positions of the top matches
    let best = topMatches;
    let matchPos = [];
    for (let i in topMatches) {
        matchPos.push([]);
        for (let x in searched) {
            
        };
    };
    return matchPos;
};
//window.alert(GSMatch(GSSearch(tempstring, 3), 2));
window.alert(GSBest(GSMatch(GSSearch(tempstring, 3), 2), GSSearch(tempstring, 3)));
