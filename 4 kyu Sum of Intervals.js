// https://www.codewars.com/kata/52b7ed099cdc285c300001cd/train/javascript

function sumIntervals(intervals) {
    if (intervals.length === 0) return 0

    let sortedIntervals = intervals.sort((firstElem, secondElem) => {
        if (firstElem[0] === secondElem[0]) {
            return firstElem[1] - secondElem[1];
        }
        return firstElem[0] - secondElem[0];
    });

    let result = 0;
    let start = sortedIntervals[0][0]
    let end = sortedIntervals[0][1]
    for (let i = 1; i < sortedIntervals.length; i++) {
        if (sortedIntervals[i][0] > end) {
            result += end - start;
            start = sortedIntervals[i][0];
        }
        end = sortedIntervals[i][1] > end ? sortedIntervals[i][1] : end;
    }

    return result + end - start;
}

console.log(sumIntervals([
    [1,4],
    [7, 10],
    [3, 5]
] )) // 7

console.log(sumIntervals( [
    [1, 5],
    [10, 20],
    [1, 6],
    [16, 19],
    [5, 11]
] )); //19

console.log(sumIntervals( [
    [-1e9, 1e9],
] )); //19