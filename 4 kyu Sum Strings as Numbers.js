// https://www.codewars.com/kata/5324945e2ece5e1f32000370/train/javascript

function sumStrings(a, b) {

    let minLength = Math.min(a.length, b.length)
    let aLength = a.length;
    let bLength = b.length;
    let result = '';
    let additional = 0;
    let sumOfTwo = 0;
    for (let i = 1; i <= minLength; i++) {
        sumOfTwo = (String(+a[aLength-i] + +b[bLength-i] + additional)).padStart(2, '0');
        ([result, additional] = [sumOfTwo[1] + result, +sumOfTwo[0]]);
    }

    let maxLength = Math.max(a.length, b.length)
    if (a.length > b.length) {
        for (let j = b.length+1; j <= a.length; j++) {
            sumOfTwo = (String(+a[maxLength-j] + additional)).padStart(2, '0');
            ([result, additional] = [sumOfTwo[1] + result, +sumOfTwo[0]]);
        }
    }

    if (b.length > a.length) {
        for (let j = a.length+1; j <= b.length; j++) {
            sumOfTwo = (String(+b[maxLength-j] + additional)).padStart(2, '0');
            ([result, additional] = [sumOfTwo[1] + result, +sumOfTwo[0]]);
        }
    }

    let zeroCount = 0;
    for (let i = 0; i < maxLength; i++) {
        if (result[i] === '0') {
            zeroCount += 1;
        } else {
            break
        }
    }

    if (additional) {
        return String(additional) + result
    }
    return result.slice(zeroCount)
}


// console.log(sumStrings('1123','123'));// '579'
// console.log(sumStrings('800', '9567')); // '10367'
console.log(sumStrings('00103', '08567')) // 8670