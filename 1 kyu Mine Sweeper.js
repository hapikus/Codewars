// https://www.codewars.com/kata/57ff9d3b8f7dda23130015fa/train/javascript


function solveMine(map, n){

    function makeReturn() {
        let answer = '';

        for (let r = 0; r < map2D.length; r++) {
            for (let c = 0; c < map2D[0].length; c++) {
                if (map2D[r][c] === '?') {
                    map2D[r][c] = open(r, c);
                    if (open(r, c) === 'x') {
                        console.log('open mine makeReturn()', r, c);
                        throw new Error('open mine makeReturn()');
                    }
                    if (checkOpen(r, c)) {
                        incorrectOpen = true;
                        return
                    }
                }
                answer += map2D[r][c] + ' '
            }
            answer = answer.trim() + '\n'
        }
        return answer.trim();
    } /* makeReturn() */

    function checkRC(r, c) {
        return (r < map2D.length
            && r >= 0
            && c < map2D[0].length
            && c >= 0
        )
    }

    function checkOpen(r, c) {
        let minAround = 0;

        for (let r1 = -1; r1 < 2; r1++) {
            for (let c1 = -1; c1 < 2; c1++) {
                if (checkRC(r + r1, c + c1) && map2D[r+r1][c+c1] === 'x') {
                    minAround++;
                }
            }
        }
        if (minAround > map2D[r][c]) {
            console.log('minAround > map2D[r][c]', r, c);
        }
        return minAround > map2D[r][c]
    } /* checkOpen */

    function map2DtoString() {
        let str = '';
        for (let r = 0; r < map2D.length; r++) {
            for (let c = 0; c < map2D[0].length; c++) {
                str += map2D[r][c];
            }
        }

        return str
    } /* map2DtoString() */

    function mapArray2D(map) {
        // create 2D Array from String
        let rowLength = 0;
        let mapArray = [];

        let tempArr = map.split(' ');

        let indexResult = 0;
        while (indexResult < tempArr.length) {
            if ( tempArr[indexResult].match(/\n/g) !== null) {
                if (rowLength === 0) rowLength = indexResult+1;
                let newElem = tempArr[indexResult].split('\n');
                tempArr.splice( indexResult, 1, ...newElem );
            }
            indexResult += 1;
        }

        for (let i=0; i < tempArr.length; i++) {
            if (tempArr[i].trim() !== '') {
                mapArray.push(tempArr[i].replace(/\n/g, ''));
            }
        }

        let mapArray2D = []
        for (let i = 0; i < mapArray.length; i += rowLength) {
            mapArray2D.push(mapArray.slice(i, i + rowLength))
        }

        return mapArray2D;
    } /* map2D(map) */

    function checkZero() {

        for (let r = 0; r < map2D.length; r++) {
            for (let c = 0; c < map2D[0].length; c++) {
                if (map2D[r][c] === '0') {

                    for (let r1 = -1; r1 < 2; r1++) {
                        for (let c1 = -1; c1 < 2; c1++) {
                            if ( checkRC(r + r1, c + c1)
                                && map2D[r + r1][c + c1] === '?') {
                                map2D[r + r1][c + c1] = open (r + r1,c + c1);
                                if (open(r + r1,c + c1) === 'x') {
                                    console.log('open mine checkZero()', r + r1, c + c1)
                                    throw new Error('open mine checkZero()');
                                }
                                if (checkOpen(r + r1, c + c1)) {
                                    incorrectOpen = true;
                                    return
                                }
                            }
                        }
                    }

                }
            }
        }
    } /* checkZero() */

    function checkMines() {
        for (let r = 0; r < map2D.length; r++) {
            for (let c = 0; c < map2D[0].length; c++) {
                if (+map2D[r][c] > 0) {

                    let questCoordination = [];
                    let minesAndQuestAround = 0

                    for (let r1 = -1; r1 < 2; r1++) {
                        for (let c1 = -1; c1 < 2; c1++) {

                            if (checkRC(r + r1, c + c1)) {
                                if (map2D[r + r1][c + c1] === '?') {
                                    questCoordination.push([r + r1, c + c1]);
                                    minesAndQuestAround += 1
                                }

                                if (map2D[r + r1][c + c1] === 'x') {
                                    minesAndQuestAround += 1
                                }
                            }

                        }
                    }

                    if (+map2D[r][c] === minesAndQuestAround) {
                        for (xCoor of questCoordination) {
                            map2D[xCoor[0]][xCoor[1]] = 'x';
                        }
                    }
                }
            }
        }
    } /* checkMines() */

    function checkNumbers() {
        for (let r = 0; r < map2D.length; r++) {
            for (let c = 0; c < map2D[0].length; c++) {

                if (+map2D[r][c] > 0) {

                    let minesAround = 0;
                    let questionMarkCoorAr = [];

                    for (let r1 = -1; r1 < 2; r1++) {
                        for (let c1 = -1; c1 < 2; c1++) {

                            if (checkRC(r + r1, c + c1)) {
                                if (map2D[r + r1][c + c1] === 'x') {
                                    minesAround += 1;
                                }

                                if (map2D[r + r1][c + c1] === '?') {
                                    questionMarkCoorAr.push([r + r1, c + c1])
                                }
                            }
                        }
                    }

                    if (+map2D[r][c] === minesAround && questionMarkCoorAr.length > 0) {
                        for (questCoorAr of questionMarkCoorAr) {
                            if (open(questCoorAr[0], questCoorAr[1]) === 'x') {
                                console.log('open mine checkNumbers()', questCoorAr[0], questCoorAr[1]);
                                console.log(r, c, map2D[r][c], minesAround);
                                console.log(map2D.map((elem) => elem.join(' ')).join('\n'));
                                console.log('--------------------------------');
                                console.log(map2DHard.map((elem) => elem.join(' ')).join('\n'));
                                throw new Error('')
                            }
                            map2D[questCoorAr[0]][questCoorAr[1]] = open(questCoorAr[0], questCoorAr[1]);
                            if (checkOpen(questCoorAr[0], questCoorAr[1])) {
                                incorrectOpen = true;
                                return
                            }
                        }
                    }

                }

            }
        }

    } /* checkNumbers() */

    function hardMapRefresh() {
        for (let r = 0; r < map2D.length; r++) {
            for (let c = 0; c < map2D[0].length; c++) {
                map2DHard[r][c] = map2D[r][c];
            }
        }
    } /* hardMapRefresh() */

    function hardMapCalc() {
        totalWeight = 0;

        for (let r = 0; r < map2D.length; r++) {
            for (let c = 0; c < map2D[0].length; c++) {
                if (map2D[r][c] === 'x') {

                    for (let r1 = -1; r1 < 2; r1++) {
                        for (let c1 = -1; c1 < 2; c1++) {

                            if (checkRC(r + r1, c + c1)) {
                                if (+map2DHard[r+r1][c+c1] > 0) {
                                    if (map2DHard[r+r1][c+c1] - 1 < 0) {
                                        console.log('map2DHard has number less then 0', r+r1, c+c1);
                                        throw new Error('map2DHard has number less then 0');
                                    }
                                    map2DHard[r+r1][c+c1] = (map2DHard[r+r1][c+c1] - 1) + '';
                                }
                            }
                        }
                    }
                }
            }
        }

        for (let r = 0; r < map2D.length; r++) {
            for (let c = 0; c < map2D[0].length; c++) {
                if (+map2DHard[r][c] > 0) {
                    totalWeight += +map2DHard[r][c];
                }
            }
        }


    } /* hardMap() */

    function hardMapCheck() {

        let smallNumArr = [];
        let bigNumArr = []
        let checkEach;

        for (let r = 0; r < map2DHard.length; r++) {
            checkEach = (map2DHard[r].join('').includes('1')
                        || map2DHard[r].join('').includes('2')
                        || map2DHard[r].join('').includes('3'));
            if (!checkEach) continue
            for (let c = 0; c < map2DHard[0].length; c++) {
                if (+map2DHard[r][c] === 1) {
                    smallNumArr.push([r, c]);
                } else if (+map2DHard[r][c] >= 2) {
                    bigNumArr.push([r, c]);
                }
            }
        }

        // check corner situation start
        if (bigNumArr.length !== 0) {
            for (let bigOne of bigNumArr) {
                let r = bigOne[0];
                let c = bigOne[1];
                if (map2DHard[r][c] !== '2') continue

                let bigOneAroundCoordination = [] // sell around
                let oneCount = []; // 1 around

                for (let r1 = -1; r1 < 2; r1++) {
                    for (let c1 = -1; c1 < 2; c1++) {
                        if (checkRC(r + r1, c + c1)) {
                            bigOneAroundCoordination.push([r + r1, c + c1]);
                            if (map2DHard[r + r1][c + c1] === '1') {
                                oneCount.push([r + r1, c + c1]);
                            }
                        }
                    }
                }

                if (oneCount.length >= +map2DHard[r][c]) {

                    let oneChangesArr = [];

                    for (let one of oneCount) {
                        let oneR = one[0];
                        let oneC = one[1];

                        for (let r1 = -1; r1 < 2; r1++) {
                            for (let c1 = -1; c1 < 2; c1++) {

                                if (checkRC(oneR + r1, oneC + c1)) {
                                    if (map2DHard[oneR + r1][oneC + c1] === '?') {
                                        map2DHard[oneR + r1][oneC + c1] = oneR + ' ' + oneC;
                                        oneChangesArr.push([oneR+r1, oneC+c1]);
                                    }
                                }
                            }
                        }
                    }

                    let aroundSet = new Set();
                    let changesAroundBig = 0;
                    let queAround = [];

                    for (let around of bigOneAroundCoordination) {
                        let aroundR = around[0];
                        let aroundC = around[1];

                        if (map2DHard[aroundR][aroundC].length > 1) {
                            aroundSet.add(map2DHard[aroundR][aroundC]);
                            changesAroundBig += 1;
                        }

                        if (map2DHard[aroundR][aroundC] === '?') {
                            queAround.push([aroundR, aroundC]);
                        }
                    }

                    if (aroundSet.size === +map2DHard[r][c]
                        && changesAroundBig === oneChangesArr.length
                        && queAround.length > 0
                    ) {
                        for (let questCoor of queAround) {
                            if (open(questCoor[0], questCoor[1]) === 'x') {
                                console.log('open mine hardMapCheck() 2 and 1 cases', questCoor[0], questCoor[1])
                                console.log('questCoor', questCoor, 'bigOne', bigOne);
                                console.log(map2D.map((elem) => elem.join(' ')).join('\n'));
                                console.log('--------------------------------');
                                console.log(map2DHard.map((elem) => elem.join(' ')).join('\n'));
                                throw new Error('open mine hardMapCheck() 2 and 1 cases');
                            }
                            map2D[questCoor[0]][questCoor[1]] = open(questCoor[0], questCoor[1]);
                            if (checkOpen(questCoor[0], questCoor[1])) {
                                incorrectOpen = true;
                                return
                            }
                        }
                        return
                    }

                    for (let changCoor of oneChangesArr) {
                        map2DHard[changCoor[0]][changCoor[1]] = '?';
                    }
                }
            }
        }

        // check corner situation finish

        for (let r = 0; r < map2DHard.length; r++) {
            for (let c = 0; c < map2DHard[0].length; c++) {
                if (map2DHard[r][c].length > 1) {
                    console.log(map2DHard[r][c], r, c)
                    throw new Error('incorrect map2DHard');
                }
            }
        }

        // bigNumArr start
        if (bigNumArr.length !== 0) {
            for (let one of smallNumArr) {

                // take 1
                let r = one[0];
                let c = one[1];
                let changesSlots = []

                // changing ? around 1 to 'x'
                for (let r1 = -1; r1 < 2; r1++) {
                    for (let c1 = -1; c1 < 2; c1++) {
                        if (checkRC(r + r1, c + c1)) {
                            if (map2DHard[r+r1][c+c1] === '?') {
                                map2DHard[r+r1][c+c1] = 'x';
                                changesSlots.push([r+r1, c+c1])
                            }
                        }
                    }
                }

                // check BigNumbers
                for (let bigOne of bigNumArr) {
                    let r = bigOne[0];
                    let c = bigOne[1];

                    let questionCounter = [];

                    for (let r1 = -1; r1 < 2; r1++) {
                        for (let c1 = -1; c1 < 2; c1++) {
                            if (checkRC(r + r1, c + c1)) {
                                if (map2DHard[r+r1][c+c1] === '?') {
                                    questionCounter.push([r+r1, c+c1])
                                }
                            }
                        }
                    }

                    if (questionCounter.length === 1) {
                        r = questionCounter[0][0];
                        c = questionCounter[0][1];
                        map2D[r][c] = 'x';
                        return
                    }
                    changesSlots.forEach((elem) => map2DHard[elem[0]][elem[1]] = '?');
                }
            }
        }
        // bigNumArr finish

        // smallNumArr start
        for (let one of smallNumArr) {
            // take 1
            let r = one[0];
            let c = one[1];
            let yCount = []

            // changing ? around 1 to 'y'
            for (let r1 = -1; r1 < 2; r1++) {
                for (let c1 = -1; c1 < 2; c1++) {
                    if (checkRC(r + r1, c + c1)) {
                        if (map2DHard[r+r1][c+c1] === '?') {
                            map2DHard[r+r1][c+c1] = 'y';
                            yCount.push([r+r1, c+c1])
                        }
                    }
                }
            }

            // check another Ones
            for (let anotherOne of smallNumArr) {
                let anotherR = anotherOne[0];
                let anotherC = anotherOne[1];
                let anotherYCount = 0;
                let anotherQuestionCount = [];

                // changing ? around 1 to 'y'
                for (let r1 = -1; r1 < 2; r1++) {
                    for (let c1 = -1; c1 < 2; c1++) {
                        if (checkRC(anotherR + r1, anotherC + c1)) {
                            if (map2DHard[anotherR + r1][anotherC + c1] === 'y') {
                                anotherYCount++
                            }
                            if (map2DHard[anotherR + r1][anotherC + c1] === '?') {
                                anotherQuestionCount.push([anotherR + r1, anotherC + c1])
                            }
                        }
                    }
                }

                // if all y around our 1 - it means there will be mine 100%
                // so we can change all question mark
                if (anotherYCount === yCount.length
                    && anotherQuestionCount.length > 0) {
                    for (let queCood of anotherQuestionCount) {
                        map2D[queCood[0]][queCood[1]] = open(queCood[0], queCood[1])
                        if (open(queCood[0], queCood[1]) === 'x') {
                            console.log('open mine hardMapCheck() small numbers', queCood[0], queCood[1])
                        }
                        if (checkOpen(queCood[0], queCood[1])) {
                            incorrectOpen = true;
                            return
                        }
                    }
                    return
                }
            }

            for (let yCoor of yCount) {
                map2DHard[yCoor[0]][yCoor[1]] = '?'
            }
        }
        // smallNumArr finish

    } /* hardMapCheck() */

    function threeMineFast() {
        const combine = (arr, k, withRepetition = false) => {
            const combinations = []
            const combination = Array(k)
            const internalCombine = (start, depth) => {
                if (depth === k) {
                    combinations.push([...combination])
                    return
                }
                for (let index = start; index < arr.length; ++index) {
                    combination[depth] = arr[index]
                    internalCombine(index + (withRepetition ? 0 : 1), depth + 1)
                }
            }
            internalCombine(0, 0)

            return combinations
        } /* combine */

        let unknownsCells = [];
        let aroundCells = [];

        for (let r = 0; r < map2DHard.length; r++) {
            for (let c = 0; c < map2DHard[0].length; c++) {
                if (map2DHard[r][c] === '?') {
                    unknownsCells.push([r, c]);
                } else if (+map2DHard[r][c] > 0) {
                    aroundCells.push([r, c])
                }
            }
        }

        let remindMines = map2DtoString().match(/x/g) !== null ?
            n - map2DtoString().match(/x/g).length : n
        let combination = combine(unknownsCells, remindMines);

        let goodVariants = [];

        // check each variant
        for (let variant of combination) {

            let correctVariant = true;

            for (let quest of variant) {
                map2DHard[quest[0]][quest[1]] = 'y';
            }

            let currentWeight = 0;

            checkNumberAround:
            for (let around of aroundCells) {
                let r = around[0];
                let c = around[1];
                for (let r1 = -1; r1 < 2; r1++) {
                    for (let c1 = -1; c1 < 2; c1++) {
                        if (checkRC(r + r1, c +c1) && map2DHard[r+r1][c+c1] === 'y') {
                            map2DHard[r][c] -= 1;
                            if (map2DHard[r][c] < 0) {
                                correctVariant = false;
                                break checkNumberAround
                            }
                        }
                    }
                }
                currentWeight += +map2DHard[r][c]
            }

            if (correctVariant && currentWeight === 0) {
                goodVariants.push(variant)
            }

            hardMapRefresh();
            hardMapCalc();

        }

        let unknownsCellsStr = new Set(unknownsCells.map(elem => elem.join(' ')));
        let mines = {};
        let goodVariantsLength = goodVariants.length;
        for (let variant of goodVariants) {
            for (let i = 0; i < variant.length; i++) {
                mines[variant[i].join(' ')] = mines.hasOwnProperty(variant[i].join(' ')) ?
                    mines[variant[i].join(' ')] += 1 : 1;
                unknownsCellsStr.delete(variant[i].join(' '));
            }
        }

        for (let safe of unknownsCellsStr) {
            [row, column] = safe.split(' ');
            map2D[row][column] = open(row, column);
            if (open(row, column) === 'x') {
                console.log('open mine threeMineFast()', row, column)
                throw new Error('open mine threeMineFast()')
            }
            if (checkOpen(row, column)) {
                incorrectOpen = true;
                return
            }
        }

        for (let mine in mines) {
            if (mines[mine] === goodVariantsLength) {
                [row, column] = mine.split(' ');
                map2D[row][column] = 'x';
            }
        }


    } /* threeMineFast() */

    function twoMineFast() {

        let UnknownsCells = [];
        let weightArr = [];

        //fill up coordArr and weightArr
        for (let r = 0; r < map2DHard.length; r++) {
            for (let c = 0; c < map2DHard[0].length; c++) {
                // question weight
                if (map2DHard[r][c] === '?') {
                    let currentQuestWeight = 0;
                    for (let r1 = -1; r1 < 2; r1++) {
                        for (let c1 = -1; c1 < 2; c1++) {
                            if (checkRC(r+r1, c+c1) && +map2DHard[r + r1][c + c1] > 0) {
                                currentQuestWeight++;
                            }
                        }
                    }
                    UnknownsCells.push([r, c]);
                    weightArr.push(currentQuestWeight);
                }
            }
        }

        // slow variant start
        let possibleVariants = new Set();

        slowVariant:
        for (let i = 0; i < UnknownsCells.length; i++) {

            hardMapRefresh();
            hardMapCalc();

            let r = UnknownsCells[i][0];
            let c = UnknownsCells[i][1];

            map2DHard[r][c] = 'y';

            for (let r1 = -1; r1 < 2; r1++) {
                for (let c1 = -1; c1 < 2; c1++) {
                    if ( checkRC(r + r1, c + c1) && +map2DHard[r + r1][c + c1] >= 0) {
                        if (map2DHard[r + r1][c + c1] - 1 < 0) continue slowVariant
                        map2DHard[r + r1][c + c1] = map2DHard[r + r1][c + c1] - 1 + '';
                    }
                }
            }

            let weightSlowVariant = 0

            for (let weightR = 0; weightR < map2DHard.length; weightR++) {
                for (let weightC = 0; weightC < map2DHard[0].length; weightC++) {
                    if (+map2DHard[weightR][weightC] > 0) {
                        weightSlowVariant += +map2DHard[weightR][weightC];
                    }
                }
            }

            if (weightSlowVariant > 8 || weightSlowVariant === 0) continue

            for (let j = 0; j < UnknownsCells.length; j++) {
                if (i === j) continue

                let posR = UnknownsCells[j][0];
                let posC = UnknownsCells[j][1];

                let posWeight = 0;
                for (let r1 = -1; r1 < 2; r1++) {
                    for (let c1 = -1; c1 < 2; c1++) {
                        if (checkRC(posR + r1, posC + c1) && +map2DHard[posR + r1][posC + c1] > 0) {
                            posWeight++
                        }
                    }
                }
                // console.log( posR, posC, posWeight);
                if (posWeight === weightSlowVariant) {
                    possibleVariants.add(Math.min(i, j) + ' ' + Math.max(i, j))
                }
            }
        }

        let goodVariant = new Set();
        if (possibleVariants.size > 0) {
            possibleVariants = [...possibleVariants];
            for (let probVariant of possibleVariants) {
                [first, second] = probVariant.split(' ');
                let questFirst = UnknownsCells[first];
                let questSecond = UnknownsCells[second];

                map2D[questFirst[0]][questFirst[1]] = 'x'
                map2D[questSecond[0]][questSecond[1]] = 'x'

                let validSolution = true;

                Validation:
                for (let validR = 0; validR < map2D.length; validR++) {
                    for (let validC = 0; validC < map2D[0].length; validC++) {
                        if (checkOpen(validR, validC)) {
                            validSolution = false;
                            break Validation
                        }
                    }
                }

                hardMapRefresh();
                hardMapCalc();

                if (validSolution && totalWeight === 0) {
                    goodVariant.add(Math.min(first, second) + ' ' + Math.max(first, second));
                }

                map2D[questFirst[0]][questFirst[1]] = '?';
                map2D[questSecond[0]][questSecond[1]] = '?';

                hardMapRefresh();
                hardMapCalc();
            }
        }

        if (goodVariant.size === 1) {
            let goodVariantArr = [...goodVariant];
            [first, second] = goodVariantArr[0].split(' ');
            let questFirst = UnknownsCells[first];
            let questSecond = UnknownsCells[second];

            map2D[questFirst[0]][questFirst[1]] = 'x'
            map2D[questSecond[0]][questSecond[1]] = 'x'

            return
        }

    } /* twoMine() */

    function lastMine() {

        // count sum of numbers on map

        let hardMapSum = 0;
        let lastMineQuestionCoordination = [];

        for (let r = 0; r < map2DHard.length; r++) {
            for (let c = 0; c < map2DHard[0].length; c++) {

                if (+map2DHard[r][c] > 0) {
                    hardMapSum += +map2DHard[r][c];
                }

                if (map2DHard[r][c] === '?') {
                    lastMineQuestionCoordination.push([r, c]);
                }
            }
        }

        // check Sum around question

        let possibleMine = [];

        for (let QuestionCoordination of lastMineQuestionCoordination) {
            let r = QuestionCoordination[0];
            let c = QuestionCoordination[1];
            let count = 0;

            for (let r1 = -1; r1 < 2; r1++) {
                for (let c1 = -1; c1 < 2; c1++) {
                    if (checkRC(r+r1, c+c1)) {
                        if (+map2DHard[r+r1][c+c1] > 0) {
                            count += +map2DHard[r+r1][c+c1]
                        }
                    }
                }
            }
            if (count === hardMapSum) {
                possibleMine.push([r, c]);
            }
        }
        if (possibleMine.length === 1) {
            map2D[possibleMine[0][0]][possibleMine[0][1]] = 'x';
        }

    } /* lastMine() */

    let map2D = mapArray2D(map);
    let map2DHard;
    let totalWeight = 0;
    let incorrectOpen = false;

    let changes = true;

    checkZero();

    while (changes) {
        // create copy of map2D
        let startMap = map2DtoString();

        if (!startMap.includes('?')) break;

        checkMines();
        if (incorrectOpen) break;
        checkNumbers();
        if (incorrectOpen) break;

        if (startMap !== map2DtoString()) continue
        map2DHard = mapArray2D(map);
        hardMapRefresh();
        hardMapCalc();
        hardMapCheck();
        if (incorrectOpen) break;

        if (startMap !== map2DtoString()) continue

        if (map2DtoString().match(/x/g) !== null) {
            if (n - map2DtoString().match(/x/g).length === 3) threeMineFast();
            if (n - map2DtoString().match(/x/g).length === 2) twoMineFast();
            if (n - map2DtoString().match(/x/g).length === 1) lastMine();
        }

        // check if there is any changes on map2D
        changes = !(startMap === map2DtoString());

        if (map2DtoString().match(/x/g) !== null
            && n === map2DtoString().match(/x/g).length ) {
            break
        }

    } /* while (changes) */

    if (incorrectOpen) return '?'

    if (map2DtoString().match(/x/g) !== null
        && map2DtoString().match(/x/g).length === n ) {
        let answer = makeReturn();
        if (incorrectOpen) return '?'
        return answer
    }

    // console.log(map2D.map((elem) => elem.join(' ')).join('\n'));
    // console.log(map2DtoString().match(/x/g).length);
    return '?'

} /* solveMine */

function open(row, column) {
    return resultOpen[row][column];
}

function resultArray2D(result) {

    let rowLength = 0;
    let resultArray = [];

    let tempArr = result.split(' ');

    let indexResult = 0;

    while (indexResult < tempArr.length) {
        if ( tempArr[indexResult].match(/\n/g) !== null) {
            if (rowLength === 0) rowLength = indexResult+1;
            let newElem = tempArr[indexResult].split('\n');
            tempArr.splice( indexResult, 1, ...newElem );
        }
        indexResult += 1;
    }

    for (let i=0; i < tempArr.length; i++) {
        if (tempArr[i].trim() !== '') {
            resultArray.push(tempArr[i].replace(/\n/g, ''));
        }
    }

    let resultArray2D = []
    for (let i = 0; i < resultArray.length; i += rowLength) {
        resultArray2D.push(resultArray.slice(i, i + rowLength))
    }

    return resultArray2D;
}

let solved = [];
let map = '';
let result = '';
let n = 0;
let resultOpen = [];

// test case 1
console.log('test case 1')
map =   `? ? ? ? ? ?
         ? ? ? ? ? ?
         ? ? ? 0 ? ?
         ? ? ? ? ? ?
         ? ? ? ? ? ?
         0 0 0 ? ? ?`;

result =`1 x 1 1 x 1
         2 2 2 1 2 2
         2 x 2 0 1 x
         2 x 2 1 2 2
         1 1 1 1 x 1
         0 0 0 1 1 1`;
n = 6;

resultOpen = resultArray2D(result)
solved = solveMine(map, n);
// console.log('Solution:\n' + solved)
console.log('Is it correct?', resultOpen.map((elem) => elem.join(' ')).join('\n') === solved);

// test case 2
console.log('test case 2')
map =      `0 0 0 0 ? ? ? ? ? ?
            0 0 0 ? ? ? ? ? ? ?
            0 ? ? ? ? ? ? ? ? ?
            ? ? ? ? ? ? ? ? ? 0
            ? x ? ? 0 0 0 0 0 0
            ? ? ? 0 0 0 0 0 0 0`;

result =   `0 0 0 0 1 1 1 1 1 1
            0 0 0 1 2 x 2 2 x 1
            0 1 1 2 x 2 2 x 2 1
            1 2 x 2 1 1 1 1 1 0
            1 x 2 1 0 0 0 0 0 0
            1 1 1 0 0 0 0 0 0 0`;
n = 6;

resultOpen = resultArray2D(result)
solved = solveMine(map, n);
// console.log('Solution:\n' + solved)
console.log('Is it correct?', resultOpen.map((elem) => elem.join(' ')).join('\n') === solved);

// test case 3
console.log('test case 3')
map =      `? ? ? 0 0 ? ? ? ? ? ? 0 0 ? ? ? ?
            ? ? ? 0 0 ? ? ? ? ? ? 0 0 ? ? ? ?
            0 0 0 0 0 ? ? ? ? 0 0 0 0 0 ? ? ?
            0 0 0 0 0 0 ? ? ? 0 0 0 0 0 ? ? ?
            0 0 0 0 0 0 0 0 0 0 0 0 0 0 ? ? ?
            ? ? ? 0 0 0 0 0 0 0 0 0 0 ? ? ? ?
            ? ? ? 0 0 0 0 0 0 0 0 0 0 ? ? ? ?`;

result =   `1 x 1 0 0 2 x 2 1 x 1 0 0 1 x x 1
            1 1 1 0 0 2 x 3 2 1 1 0 0 1 3 4 3
            0 0 0 0 0 1 2 x 1 0 0 0 0 0 1 x x
            0 0 0 0 0 0 1 1 1 0 0 0 0 0 1 2 2
            0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1
            1 1 1 0 0 0 0 0 0 0 0 0 0 1 2 x 1
            1 x 1 0 0 0 0 0 0 0 0 0 0 1 x 2 1`;
n = 12;

resultOpen = resultArray2D(result)
solved = solveMine(map, n);
// console.log('Solution:\n' + solved)
console.log('Is it correct?', resultOpen.map((elem) => elem.join(' ')).join('\n') === solved);

// test case 4
console.log('test case 4')
map =      `0 0 0 ? ? ? ? ? ? 0 0 0 0 0 ? ? ? 0 0 ? ? ? ? ? ? ? ?
            ? ? 0 ? ? ? ? ? ? 0 0 0 0 0 ? ? ? ? ? ? ? ? ? ? ? ? ?
            ? ? ? ? 0 0 0 0 0 0 ? ? ? 0 ? ? ? ? ? ? 0 ? ? ? ? ? ?
            ? ? ? ? 0 0 0 0 0 0 ? ? ? 0 0 0 0 ? ? ? 0 ? ? ? ? ? ?
            0 ? ? ? 0 0 0 0 0 0 ? ? ? 0 0 0 0 0 0 0 0 ? ? ? ? ? ?
            0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ? ? ? ? 0`;

result =   `0 0 0 1 x 1 1 x 1 0 0 0 0 0 1 1 1 0 0 1 x 3 x 3 1 2 1
            1 1 0 1 1 1 1 1 1 0 0 0 0 0 1 x 1 1 1 2 1 3 x 3 x 2 x
            x 2 1 1 0 0 0 0 0 0 1 1 1 0 1 1 1 1 x 1 0 2 2 3 1 3 2
            1 2 x 1 0 0 0 0 0 0 1 x 1 0 0 0 0 1 1 1 0 1 x 2 1 2 x
            0 1 1 1 0 0 0 0 0 0 1 1 1 0 0 0 0 0 0 0 0 1 2 3 x 2 1
            0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 x 2 1 0`;
n = 16;

resultOpen = resultArray2D(result)
solved = solveMine(map, n);
// console.log('Solution:\n' + solved)
console.log('Is it correct?', resultOpen.map((elem) => elem.join(' ')).join('\n') === solved);

// test case 5
console.log('test case 5')
map =   `0 ? ? ? ? ? 0 0 0 0 ? ? ? 0 0 0 0 0 0 0 ? ? ? ? 0 0
         0 ? ? ? ? ? 0 0 0 0 ? ? ? 0 0 0 0 ? ? ? ? ? ? ? ? ?
         ? ? ? ? ? ? 0 0 0 0 ? ? ? ? 0 0 0 ? ? ? ? ? ? ? ? ?
         ? ? ? 0 0 0 0 0 0 0 0 ? ? ? 0 0 0 ? ? ? ? ? ? ? ? ?`;

result =`0 1 x 2 1 1 0 0 0 0 1 1 1 0 0 0 0 0 0 0 1 x x 1 0 0
         0 1 1 2 x 1 0 0 0 0 1 x 1 0 0 0 0 1 1 1 1 2 2 2 1 1
         1 1 1 1 1 1 0 0 0 0 1 2 2 1 0 0 0 1 x 1 1 1 1 1 x 1
         1 x 1 0 0 0 0 0 0 0 0 1 x 1 0 0 0 1 1 1 1 x 1 1 1 1`;
n = 10;

resultOpen = resultArray2D(result);
solved = solveMine(map, n);
// console.log('Solution:\n' + solved);
console.log('Is it correct?', resultOpen.map((elem) => elem.join(' ')).join('\n') === solved);