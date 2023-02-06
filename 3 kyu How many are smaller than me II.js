// https://www.codewars.com/kata/56a1c63f3bc6827e13000006/train/javascript


function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function* pseudoRandom(seed) {
    while (true) {
        // let next = seed * 16807 % 2147483647;
        let next = seed * 1680 % 2147;
        seed = next;
        yield next;
    }
}

function myMethod(func, arr) {
    let durationInMs = [];
    let count = 0
    while (durationInMs.length < 10) {
        const startTimeInMs = new Date().getTime();
        let result = func(arr);
        const endTimeInMs = new Date().getTime();
        durationInMs.push(endTimeInMs - startTimeInMs);
    }
    return (durationInMs.reduce((acc, elem) => acc += elem, 0))/durationInMs.length

}

function smaller(arr) {

    let arrLength = arr.length;
    let result = [];
    result[arrLength - 1] = 0;

    // let arrMin = arrLength > 100 ? -1000 : Math.min(...arr);
    let arrMin = Math.min(...arr);
    // let arrMax = arrLength > 100 ? 1000 : Math.max(...arr);
    let arrMax = Math.max(...arr);
    // let arrRepeat = new Array(arrMax - arrMin + 1).fill(0);
    let arrRepeat = []
    for (let i = 0; i < arrMax - arrMin + 1; i++) {
        arrRepeat[i] = 0;
    }
    arrRepeat[arr[arrLength - 1] - arrMin] = 1

    for (let i = arrLength - 2; i >= 0; i-=1) {

        let newElem = arr[i];

        let curSum = 0;
        for (let j = 0; j < newElem - arrMin; j++) {
            curSum = curSum + arrRepeat[j];
        }

        result[i] = curSum;
        arrRepeat[newElem - arrMin]++;

    }

    return result;
}

// console.log(smaller([5, 4, 3, 2, 1])); // [4, 3, 2, 1, 0]
// console.log(smaller([1, 2, 3])); // [0, 0, 0]
// console.log(smaller([1, 2, 0])); // [1, 1, 0]
//
// console.log(smaller([1, 1, -1, 0, 0])); // [3, 3, 0, 0, 0]
// console.log(smaller([5, 4, 7, 9, 2, 4, 4, 5, 6])); // [4, 1, 5, 5, 0, 0, 0, 0, 0]
console.log(smaller([5, 4, 7, 9, 2, 4, 1, 4, 5, 6])); // [5, 2, 6, 6, 1, 1, 0, 0, 0, 0]

// let generator = pseudoRandom(1);

// let count = 0;
let arr = [];

// for (let value of generator) {
//     arr.push(value);
//     count++;
//     if (count >= 95000) break
// }

while (arr.length < 96000) {
    arr.push (randomIntFromInterval(-1000, 1000));
}

console.log(myMethod(smaller, arr));



