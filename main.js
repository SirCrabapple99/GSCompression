let GSDictionary = [];
const tempstring = `The quick brown fox jumped over the lazy dog`;
// take provided string and return pairs of (size)
function GSSearch(string, size) {
        if (!string || !size) {console.error('missing 1+ required parameters of GSSearch(string, size)'); return;};
        let searched = [];
        for (let i = 0; i < string.length; i++) {
                for (let x = 0; x < size; x++) {
                        if (string.at(i + x) == undefined) {
                                return searched;
                            };
                    };
                searched.push([string.at(i), i+':'+size]);
                for (let x = 1; x < size; x++) {
                        searched[i][0] += string.at(i + x);
                    };
            };
        return searched;
    };
// count how many there are of each match
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
// check which matches are the best to keep and which intersect, not optimized based off other matches
function GSBest() {
        
    }
window.alert(GSMatch(GSSearch(tempstring, 3), 2))
