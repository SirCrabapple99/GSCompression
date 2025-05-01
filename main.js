let dict = [];
const h = 'eee eee eee eee aaa aaa aaa sss sss ddd';
function GSMatch(searched, min) {
        if (!searched || !min) {console.error('missing 1+ required parameters of GSMatch(searched, min)'); return;};
        let matches = [];
        for (let i = 0; i < searched.length; i++) {
                let re = new RegExp(searched[i][0], 'g');
                let newMatch = -1;
                for (let x = 0; x < matches.length; x++) {
                        if (matches[x][1] == searched[i][0]) {
                            newMatch = x;
                            x += matches.length + 1
                        }
                    };
                if (newMatch == -1) {
                        matches.push([searched[i][0], searched[i][0].match(re).length]);
                    } else {
                        matches[newMatch][1] += 1;
                    };
            };
        return matches;
    };
// take provided string and return pairs of (size) for every letter
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
window.alert(GSMatch(GSSearch(h, 3), 3).sort())
