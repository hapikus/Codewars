// https://www.codewars.com/kata/58905bfa1decb981da00009e/train/javascript

function theLift(queues, capacity) {
    let currentDirection = 1;
    let firstStop;

    let currentFloor = 0;
    let peopleInTheLift = [];
    let currentFinish;
    let liftPath = [];
    let stopHere;
    let checkPeopleOnFloor;

    function addFloor(stopHere) {
        if (stopHere) {
            if (liftPath.length === 0 ) {
                liftPath.push(currentFloor)
            } else if (liftPath.length > 0 && liftPath[liftPath.length - 1] !== currentFloor){
                liftPath.push(currentFloor)
            }
        }
    } /* stopHere */

    // Работаем с промежуточным финалом
    function intermediateFinal() {
        if ( currentFloor === currentFinish) {
            stopHere = false;
            // Выпускаем пассажиров
            stopHere = getPeopleOut();

            addFloor(stopHere);
        }
    } /* intermediateFinal() */

    function getPeopleOut() {
        stopHere = false;
        while (peopleInTheLift.includes(currentFloor)) {
            stopHere = true;
            let index = peopleInTheLift.indexOf(currentFloor);
            peopleInTheLift.splice(index, 1); // 2nd parameter means remove one item only
        } // Выпускаем пассажиров
        return stopHere;
    } /* getPeopleOut() */

    function removeDone() {
        for (let i = 0; i < queues.length; i++) {
            while (queues[i].includes('Done')) {
                let index = queues[i].indexOf('Done');
                queues[i].splice(index, 1); // 2nd parameter means remove one item only
            }
        }
    } /* removeDone() */

    let count = 0;
    while (queues.flat(Infinity).length !== ((queues.flat(Infinity)).filter(x => x==='Done')).length) {
        if (currentDirection === 1) {
            firstStop = queues.length;
            currentFinish = 0;
            // ищем как высоко мы хотим подняться
            for (let i = 0; i < queues.length; i++) {
                checkPeopleOnFloor = 0;
                for (let j = 0; j < queues[i].length; j++) {
                    if (checkPeopleOnFloor <= capacity) {
                        if (queues[i][j] > currentFinish) {
                            checkPeopleOnFloor++
                            currentFinish = queues[i][j];
                            if (firstStop > i) firstStop = i;
                        } /* if */
                    } /* if in (for for) */
                } /* for with j */
            } /* for with i */
            if (count === 1) console.log(currentFloor, currentFinish, peopleInTheLift)

            // проверяем где мы сейчас
            if (currentFloor > firstStop) {
                currentFloor = firstStop;
            }

            // поехали
            for (currentFloor; currentFloor < currentFinish; currentFloor++) {
                stopHere = getPeopleOut()

                // Запускаем пассажиров
                for (let floorPeople = 0; floorPeople < queues[currentFloor].length; floorPeople++) {
                    if (queues[currentFloor][floorPeople] > currentFloor) {
                        stopHere = true;
                        if (capacity - peopleInTheLift.length > 0) {
                            peopleInTheLift.push(queues[currentFloor][floorPeople]);
                            queues[currentFloor][floorPeople] = 'Done';
                        }
                    }
                } // Запускаем пассажиров

                addFloor(stopHere)

            } /* for (currentFloor; currentFloor < currentFinish; currentFloor++) */

            // Работаем с промежуточным финалом
            intermediateFinal()

            currentDirection = -1;
        } /* if (currentDirection === 1) */

        if (currentDirection === -1) {
            firstStop = 0;
            currentFinish = queues.length;
            // ищем как высоко мы хотим подняться
            for (let i = queues.length - 1; i >= 0; i--) {
                checkPeopleOnFloor = 0;
                for (let j = 0; j < queues[i].length; j++) {
                    if (checkPeopleOnFloor <= capacity) {
                        if (queues[i][j] < currentFinish) {
                            checkPeopleOnFloor++;
                            currentFinish = queues[i][j];
                            if (firstStop < i) firstStop = i;
                        } /* if */
                    } /* if in (for for) */
                } /* for with j */
            } /* for with i */

            // проверяем где мы сейчас
            if (currentFloor < firstStop) {
                currentFloor = firstStop;
            }

            // поехали
            for (currentFloor; currentFloor > currentFinish; currentFloor--) {
                stopHere = getPeopleOut()

                // Запускаем пассажиров
                for (let floorPeople = 0; floorPeople < queues[currentFloor].length; floorPeople++) {
                    if (queues[currentFloor][floorPeople] < currentFloor) {
                        stopHere = true;
                        if ( capacity - peopleInTheLift.length > 0) {
                            peopleInTheLift.push(queues[currentFloor][floorPeople]);
                            queues[currentFloor][floorPeople] = 'Done';
                        }
                    }
                } // Запускаем пассажиров

                addFloor(stopHere)

            } /* for (currentFloor; currentFloor > currentFinish; currentFloor--) */

            // Работаем с промежуточным финалом
            intermediateFinal()
            currentDirection = 1;

        } /* if (currentDirection === -1) */

        //remove Done
        removeDone()

    } /* while */
    if (liftPath[0] !== 0) {
        liftPath = [0].concat(liftPath)
    }
    if (currentFloor === 0) return liftPath
    liftPath.push(0);
    return liftPath
}

// let queues1 = [
//     [], // 0
//     [], // 1
//     [5, 5, 5], // 2
//     [], // 3
//     [], // 4
//     [], // 5
//     [], // 6
// ];
// let result1 = theLift(queues1,5);
// console.log(result1); // [0,2,5,0]

// let queues2 = [
//     [], // G
//     [], // 1
//     [1,1], // 2
//     [], // 3
//     [], // 4
//     [], // 5
//     [], // 6
// ];
// let result2 = theLift(queues2,5);
// console.log(result2); // 0,2,1,0]

// let queues3 = [
//     [], // G
//     [3], // 1
//     [4], // 2
//     [], // 3
//     [5], // 4
//     [], // 5
//     [], // 6
// ];
// let result3 = theLift(queues3,5);
// console.log(result3); // [0,1,2,3,4,5,0]

// let queues4 =[
//     [], // G
//     [], // 1
//     [ 4, 4, 4, 4 ], // 2
//     [], // 3
//     [ 2, 2, 2, 2 ], // 4
//     [], // 5
//     [] // 6
// ];
// let result4 = theLift(queues4,2);
// console.log(result4); // [0,1,2,3,4,5,0]

// queues5 = [
//     [], // G
//     [ 0, 0, 0, 0 ], // 1
//     [ 0, 0, 0, 0 ], // 2
//     [ 0, 0, 0, 0 ], // 3
//     [ 0, 0, 0, 0 ], // 4
//     [ 0, 0, 0, 0 ], // 5
//     [ 0, 0, 0, 0 ], // 6
// ]
//
// let result5 = theLift(queues5,5);
// console.log(result5); // [ +0, 6, 5, 4, 3, 2, 1, +0, 5, 4, 3, 2, 1, +0, 4, 3, 2, 1, +0, 3, 2, 1, +0, 1, +0 ]

queues6 = [
    [ 11, 4, 2, 6 ],    // G
    [],                 // 1
    [ 9, 7, 1, 0 ],     // 2
    [ 9, 0 ],           // 3
    [ 2, 2, 7 ],        // 4
    [ 2 ],              // 5
    [],                 // 6
    [ 3, 6, 0 ],        // 7
    [ 2 ],              // 8
    [ 3 ],              // 9
    [ 0 ],              // 10
    [ 3 ],              // 11
]
let result6 = theLift(queues6,1);
console.log(result6);
// [ +0, 2, 3, 4, 11, 10, 9, 8, 7, 5, 4, 3, 2, +0, 2, 3, 4, 7, 10, 9,
// 8, 7, 5, 4, 2, +0, 2, 3, 9, 8, 7, 5, 4, 3, 2, 1, +0, 2, 3, 6,
// 8, 7, 5, 4, 2, +0, 2, 3, 7, 5, 4, 3, 9, 7, 6, 5, 4, 2, 7, 4, +0, 4, 2, 4, 2, +0 ]

queues7 = [
    [ 3 ],
    [],
    [ 3, 3, 0 ],
    [] ]
let result7 = theLift(queues7,2);
console.log(result7); // [ +0, 2, 3, 2, +0, 2, 3, +0 ]