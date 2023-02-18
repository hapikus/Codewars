// https://www.codewars.com/kata/551f23362ff852e2ab000037/train/javascript

function longestSlideDown (pyramid) {
    if (pyramid.length === 1) return pyramid[0][0];
    let pyramidSummary = [[pyramid[0][0]]];
    for (let i = 1; i < pyramid.length; i++) {
        let pyramidNextLevel = [];
        for (let j = 0; j < pyramid[i].length; j++) {
            if (j === 0) {
                pyramidNextLevel.push(pyramid[i][j] + pyramidSummary[i - 1][j]);
            } else if (j === (pyramid[i].length - 1)) {
                pyramidNextLevel.push(pyramid[i][j] + pyramidSummary[i - 1][j - 1]);
            } else {
                pyramidNextLevel.push(pyramid[i][j] + Math.max(pyramidSummary[i - 1][j - 1], pyramidSummary[i - 1][j]))
            }
        }
        pyramidSummary.push(pyramidNextLevel)
    }

    return Math.max(...pyramidSummary[pyramidSummary.length - 1]);
}

let first_one =  [
    [3],
    [7, 4],
    [2, 4, 6],
    [8, 5, 9, 3]];


let second_one = [
    [75],
    [95, 64],
    [17, 47, 82],
    [18, 35, 87, 10],
    [20,  4, 82, 47, 65],
    [19,  1, 23, 75,  3, 34],
    [88,  2, 77, 73,  7, 63, 67],
    [99, 65,  4, 28,  6, 16, 70, 92],
    [41, 41, 26, 56, 83, 40, 80, 70, 33],
    [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
    [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
    [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
    [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
    [63, 66,  4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
    [ 4, 62, 98, 27, 23,  9, 70, 98, 73, 93, 38, 53, 60,  4, 23]];

console.log(longestSlideDown(first_one));
console.log(longestSlideDown(second_one));

