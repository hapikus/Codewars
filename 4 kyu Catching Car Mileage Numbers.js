// https://www.codewars.com/kata/52c4dd683bfd3b434c000292/train/javascript

function isInteresting(number, awesomePhrases) {
    if (number + 2 < 100) return 0

    let numberArray = [];
    for (let i = 0; i < 3; i++) {
        if ((number + i + '').length > 2) {
            numberArray.push(number + i + '')
        }
    }
    for (numb of numberArray) {

        // Any digit followed by all zeros: 100, 90000
        if ((numb).split('0').length - 1 === (numb).length - 1) {
            return +numb === number ? 2 : 1
        }

        // Every digit is the same number: 1111
        if ((numb).split((numb)[0]).length - 1 ===  (numb).length) {
            return +numb === number ? 2 : 1
        }

        // The digits are sequential, incementing†: 1234
        let incementing = true;
        for (let j = 0; j < numb.length-1; j++) {
            if ((+numb[j] + 1) % 10  === +numb[j+1]) continue
            incementing = false
            break
        }
        if (incementing) return +numb === number ? 2 : 1

        // The digits are sequential, decrementing‡: 4321
        let decrementing = true;
        for (let j = 0; j < numb.length-1; j++) {
            if ( +numb[j] - 1 === +numb[j+1]) continue
            decrementing = false
            break
        }
        if (decrementing) return +numb === number ? 2 : 1

        // The digits are a palindrome: 1221 or 73837
        let palindrome = true
        for (let j = 0; j < Math.floor(numb.length / 2); j++) {
            if (numb[j] === numb[numb.length - 1 - j]) continue
            palindrome = false
            break
        }
        if (palindrome) return +numb === number ? 2 : 1
        // The digits match one of the values in the awesomePhrases array

        if (awesomePhrases.includes(+numb)) return +numb === number ? 2 : 1
    }
    return 0
}

// console.log(isInteresting(1000, []));
// console.log(isInteresting(1111, []));
console.log(isInteresting(789012, []));
console.log(isInteresting(109, []));