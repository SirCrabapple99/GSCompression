let GSDictionary = [];
const tempstring = 'eee eee eee eee aaa aaa aaa sss sss ddd';
// take provided string and return pairs of (size)
function GSSearch(string, size) {
        if (!string || !size) {console.error('missing 1+ required parameters of GSSearch(string, size)'); return;};
        let searched = [];
        for (let i = 0; i < string.length; i++) {
                if (string.at(i) == undefined || string.at(i + 1) == undefined || string.at(i + 2) == undefined) {
                      return searched;
                    };
                searched.push([string.at(i) + string.at(i + 1) + string.at(i + 2), i+':'+size]);
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
                if (i[1] <= min) {
                        matches.splice(i, 1);
                    };
            };
        return matches;
    };
window.alert(GSMatch(GSSearch(tempstring, 2), 3))
window.alert(GSSearch(tempstring, 2))
