// https://www.codewars.com/kata/55f89832ac9a66518f000118/train/javascript

function simplify(poly){
    let start = 0;
    let end = 1;
    let tmp = [];
    for (let i = 1; i < poly.length; i++) {
        if (poly[i] === '-' || poly[i] === '+') {
            end = i;
            tmp.push(poly.slice(start, end))
            start = i;
        }
        if (i === poly.length - 1 && end !== i) {
            tmp.push(poly.slice(start));
        }
    }

    let mapTmp = new Map;
    elemFor:
    for (let elem of tmp) {
        start = 0
        for (let j = 0; j < elem.length; j++) {
            if (!('-+0123456789'.includes(elem[j]))) {
                let name = [...elem.slice(j)].sort().join('');
                let numb = elem.slice(0, j)
                numb = numb === '' ||  numb === '+'? 1 :
                    numb === '-' ? -1 : +numb;
                if (mapTmp.has(name)) {
                    mapTmp.set(name, mapTmp.get(name) +numb);
                } else {
                    mapTmp.set(name, numb);
                }
                continue elemFor;
            }
        }
    }

    let sortedMapTmp = new Map([...mapTmp].sort((firstElem, secondElem) => {
        if (firstElem[0].length === secondElem[0].length) {
            if (firstElem[0] < secondElem[0]) return -1;
            return 1;
        } else {
            return firstElem[0].length - secondElem[0].length;
        }
    }));

    // console.log(sortedMapTmp)

    let answer = '';
    for (let [key, value] of sortedMapTmp.entries()) {
        if (value === 0 || value === -0) continue
        if (value === -1) {
            answer += '-' + key;
            continue
        }
        if (value === 1) {
            answer += '+' + key;
            continue
        }

        answer += (value > 0 ? '+' : '') + value + key;
    }

    return answer[0] === '+' ? answer.slice(1) : answer;
}

// console.log(simplify("dc+dcba"));
// console.log(simplify("xzy+zby")); // "byz+xyz"
// console.log(simplify("2xy-yx")); // "xy"
// console.log(simplify("-a+5ab+3a-c-2a")); // "-c+5ab"
// console.log(simplify("a+5a+3c"));
//
// console.log(simplify("-abc+3a+2ac")); // "3a+2ac-abc"
// console.log(simplify("xyz-xz")); // "-xz+xyz"

console.log(simplify("-15cb-12cb-0c+7cb")); // -20bc
// console.log(simplify("+n-5hn+7tjhn-4nh-3n-6hnjt+2jhn+9hn")); // '-2n+2hjn+hjnt'