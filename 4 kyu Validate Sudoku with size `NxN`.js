// https://www.codewars.com/kata/540afbe2dc9f615d5e000425/train/javascript

let Sudoku = function(data) {
    return {
        isValid: function() {
            let sizeN = data.length;

            // проверяем размер
            for (let line of data) {
                if (line.length !== sizeN) {
                    return false
                }
            }

            // проверяем что в линии цифры от 1 до N
            let setN = new Set()
            for (let i = 1; i <= sizeN; i++) {
                setN.add(i);
            }

            for (let line of data) {
                let lineSet = new Set(line)

                if (lineSet.size !== sizeN) return false

                for (let lineSetNum of lineSet) {
                    if (!setN.has(lineSetNum)) return false
                }
            }

            // проверяем что в столбце цифры от 1 до N
            for (let i = 0; i < sizeN; i++) {
                let newColumn = [];
                for (let j = 0; j < sizeN; j ++) {
                    newColumn.push(data[j][i]);
                }

                let columnSet = new Set(newColumn);
                if (columnSet.size !== sizeN) return false

                for (let columnSetNum of columnSet) {
                    if (!setN.has(columnSetNum)) return false
                }
            }

            // проверяем маленькие матрицы

            let minMatrixSize = Math.floor(sizeN ** (1/2));

            if (minMatrixSize ** 2 !== sizeN) return false

            for (let minMatrixLine = 0; minMatrixLine < minMatrixSize; minMatrixLine++) {
                for (let minMatrixColumn =0 ;  minMatrixColumn < minMatrixSize; minMatrixColumn++) {
                    // делаем матрицу
                    let minMatrix = [];
                    for (let i = 0; i < minMatrixSize; i++) {
                        for (let j = 0; j < minMatrixSize; j++) {
                            minMatrix.push(data[i + minMatrixLine*minMatrixSize][j + minMatrixColumn*minMatrixSize])
                        }
                    }

                    let minMatrixSet = new Set(minMatrix);
                    if (minMatrixSet.size !== sizeN) return false

                    for (let columnSetNum of minMatrixSet) {
                        if (!setN.has(columnSetNum)) return false
                    }
                }
            }

            return true;
        }
    };
};

let goodSudoku1 = new Sudoku([
    [7,8,4, 1,5,9, 3,2,6],
    [5,3,9, 6,7,2, 8,4,1],
    [6,1,2, 4,3,8, 7,5,9],

    [9,2,8, 7,1,5, 4,6,3],
    [3,5,7, 8,4,6, 1,9,2],
    [4,6,1, 9,2,3, 5,8,7],

    [8,7,6, 3,9,4, 2,1,5],
    [2,4,3, 5,6,1, 9,7,8],
    [1,9,5, 2,8,7, 6,3,4]
]);

let goodSudoku2 = new Sudoku([
    [1,4, 2,3],
    [3,2, 4,1],

    [4,1, 3,2],
    [2,3, 1,4]
]);

let badSudoku1 = new Sudoku([
    [1,2,3, 4,5,6, 7,8,9],
    [2,3,4, 5,6,7, 8,9,1],
    [3,4,5, 6,7,8, 9,1,2],

    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],

    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9],
    [1,2,3, 4,5,6, 7,8,9]
]);

let badSudoku2 = new Sudoku([
    [1,2,3,4,5],
    [1,2,3,4],
    [1,2,3,4],
    [1]
]);

console.log(goodSudoku1.isValid());
console.log(goodSudoku2.isValid());
console.log(badSudoku1.isValid());
console.log(badSudoku2.isValid());