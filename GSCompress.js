const tempstring = `eee eee eee aaa aaa bbb`;
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
// check which matches are the best to keep and which have intersecting letters (unused)
// example usage: GSBest(GSMatch(GSSearch('The quick brown fox jumped over the lazy dog', 3), 3), GSSearch('The quick brown fox jumped over the lazy dog', 3))
/* function GSBest(topMatches, searched) {
    if (!topMatches || !searched) {console.error('missing 1+ required parameters of GSBest(topMatches, searched)'); return;};
    // grab the positions of the top matches
    let best = topMatches[0];
    let matchPos = [];
    for (let i in topMatches) {
        matchPos.push([]);
        for (let x = 0; x < searched.length; x++) {
            if (searched[x][0] == topMatches[i][0]) {
                for (let y = 0; y < searched[x][1].at(-1); y++) {
                    matchPos[i].push(Number.parseInt(searched[x][1].split(':')[0]) + y);
                };
            };
        };
    };
    // determine whether or not any matches intersect
    let intersects = [];
    for (let i in matchPos) {
        intersects.push([])
        for (let x in matchPos[i]) {
            for (let y in matchPos) {
                for (let z in matchPos[y]) {
                    if (matchPos[i][x] == matchPos[y][z] && matchPos[i] != matchPos[z]) {
                        intersects[i].push(matchPos[y][z])
                    }
                }
            }
        }
    };
    // return the highest one
    return intersections;
}; */
//window.alert(GSMatch(GSSearch(tempstring, 3), 2));

// grab match with most instances
// example usage: GSBest(GSMatch(GSSearch(tempstring, 3), 2))
function GSBest(matchList) {
    if (!matchList) {console.error('missing 1+ required parameters of GSBest(matchList)'); return;};
    let highest = [];
    for (let i in matchList) {
        highest.push(matchList[1]);
    };
    highest.sort();
    return highest[0];
};

// encode top matches and store in dictionary
// example usage: GSWriteDict(match)
let GSDictionary = [];
function GSWriteDict(input) {
    if (!input) {console.error('missing 1+ required parameters of GSWriteDict(input)'); return;};
    GSDictionary.push([input, String.fromCharCode(GSDictionary.length)]);
};

// output text
function GSOutput() {
    document.getElementById('GSOutput').innerHTML = GSDictionary;
}
GSWriteDict(GSBest(GSMatch(GSSearch(tempstring, 3), 2))[0]);
GSOutput()
