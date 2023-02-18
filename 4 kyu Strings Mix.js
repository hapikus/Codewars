// https://www.codewars.com/kata/5629db57620258aa9d000014/train/javascript

function mix(s1, s2) {
    let mixMap = new Map();
    for (let i = 0; i < s1.length; i++) {
        if (s1.charCodeAt(i) <= 122 && s1.charCodeAt(i) >= 97) {
            if (!mixMap.has(s1[i])) {
                mixMap.set(s1[i], [s1.split(s1[i]).length-1]);
            }
        }
    }

    for (let j = 0; j < s2.length; j++) {
        if (s2.charCodeAt(j) <= 122 && s2.charCodeAt(j) >= 97) {
            if (mixMap.has(s2[j]) && mixMap.get(s2[j]).length === 1) {
                mixMap.set(s2[j], [...mixMap.get(s2[j]), s2.split(s2[j]).length-1]);
            }
            if (!mixMap.has(s2[j])) {
                mixMap.set(s2[j], [0, s2.split(s2[j]).length-1]);
            }
        }
    }

    // console.log(mixMap);

    let mixArray = [];
    for (let [key, value] of mixMap.entries()) {
        if (value[0] > 1 || value[1] > 1) {
            mixArray.push([
                key,
                Math.max(...value),
                value[1] === undefined? '1:' :
                    value[0] > value[1]? '1:' :
                        value[1] > value[0]? '2:' : '=:',
            ]);
        }
    }

    let sortedMixArray = (mixArray.sort((firstElem, secondElem) => {
        // .log(firstElem, secondElem)
        if (firstElem[1] === secondElem[1]) {
            if (firstElem[2] === secondElem[2]) {
                if (firstElem[0] > secondElem[0]) return 1
                return -1
            }
            if (firstElem[2] > secondElem[2]) return 1
            return -1
        }
        return secondElem[1] - firstElem[1];
    }));

    let result = ''
    for (let elem of sortedMixArray) {
        result += '/' + elem[2] + elem[0].repeat(elem[1])
    }

    return result.slice(1,);
}

// "2:eeeee/2:yy/=:hh/=:rr"
console.log(mix("Are they here", "yes, they are here"));
// "1:ooo/1:uuu/2:sss/=:nnn/1:ii/2:aa/2:dd/2:ee/=:gg"
console.log(mix("looping is fun but dangerous", "less dangerous than coding"));
//"1:aaa/1:nnn/1:gg/2:ee/2:ff/2:ii/2:oo/2:rr/2:ss/2:tt"
console.log(mix(" In many languages", " there's a pair of functions"));