// https://www.codewars.com/kata/571b93687beb0a8ade000a80/train/javascript

function solveIt(excel){
    let lineMistake = false;
    let lineProblem = -1;
    for (let i = 0; i < excel.length; i++) {
        let sum = 0;
        for (let j = 0; j < excel.length - 1; j++) {
            sum += excel[i][j]
        }
        if (sum !== excel[i][excel.length - 1]) {
            lineMistake = true;
            lineProblem = i;
            break
        }
    }

    let columnMistake = false;
    let columnProblem = -1;
    for (let i = 0; i < excel.length; i++) {
        let sum = 0;
        for (let j = 0; j < excel.length - 1; j++) {
            sum += excel[j][i]
        }
        if (sum !== excel[excel.length - 1][i]) {
            columnMistake = true;
            columnProblem = i;
            break
        }
    }

    if (lineProblem === excel.length - 1) {
        let result = 0;
        for (let i = 0; i < excel.length - 1; i++) {
            result += excel[i][columnProblem];
        }
        return result;
    }


    if (columnProblem === excel.length - 1) {
        let result = 0;
        for (let i = 0; i < excel.length - 1; i++) {
            result += excel[lineProblem][i];
        }
        return result;
    }

    console.log(lineProblem, columnProblem)

    console.log(lineProblem, columnProblem)
    return (excel[lineProblem][excel.length - 1] - (
        excel[lineProblem].reduce((partialSum, a) => partialSum + a, 0) -
        excel[lineProblem][excel.length - 1] -
        excel[lineProblem][columnProblem]));
}


let excel1 = [
    [2 ,2 ,3 ,6],
    [4 ,5 ,6 ,15],
    [7 ,8 ,9 ,24],
    [12,15,18,45],
];

// console.log(solveIt(excel1));

let excel2 = [
    [1 ,2 ,3 ,7 ],
    [4 ,5 ,6 ,15],
    [7 ,8 ,9 ,24],
    [12,15,18,45],
]

// console.log(solveIt(excel2));

let excel3 = [
    [ 47, 4, 7, 58 ],
    [ 8, 15, 31, 54 ],
    [ 8, 9, 38, 55 ],
    [ 63, 28, 88, 167 ]
]

console.log(solveIt(excel3));

