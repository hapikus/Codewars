// https://www.codewars.com/kata/525c7c5ab6aecef16e0001a5/train/javascript

function parseInt(string) {

    function arrayToNum(arr) {
        if (arr.length === 0) return 0;

        let index = -1;
        while (arr.indexOf('and') !== -1) {
            arr.splice( arr.indexOf('and'), 1);
        }

        let result = 0;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].includes('hundred')) {
                result *= 100
                continue
            }
            result += strToNum(arr[i]);
        }
        return result
    }

    function strToNum(str) {
        let strToArrLocal = str.split('-');
        let result = 0;

        for (let j = 0; j < strToArrLocal.length; j++) {
            if (strToArrLocal[j].includes('one')) result += 1;
            if (strToArrLocal[j].includes('two')) result += 2;
            if (strToArrLocal[j].includes('three')) result += 3;
            if (strToArrLocal[j].includes('four')) result += 4;
            if (strToArrLocal[j].includes('five')) result += 5;
            if (strToArrLocal[j].includes('six')) result += 6;
            if (strToArrLocal[j].includes('seven')) result += 7;
            if (strToArrLocal[j].includes('eight')) result += 8;
            if (strToArrLocal[j].includes('nine')) result += 9;

            if (strToArrLocal[j].includes('twenty')) result += 2;
            if (strToArrLocal[j].includes('thirt')) result += 3;
            if (strToArrLocal[j].includes('fort')) result += 4;
            if (strToArrLocal[j].includes('fift')) result += 5;

            if (strToArrLocal[j].includes('eleven')) result += 11;
            if (strToArrLocal[j].includes('twelve')) result += 12;

            if (strToArrLocal[j].includes('ten')) result += 10
            if (strToArrLocal[j].includes('teen')) result += 10

            if (strToArrLocal[j].includes('ty', strToArrLocal[j].length - 3)) result *= 10
        }
        return result
    }

    let strToArr = string.split(' ');
    let million = [];
    let thousand = [];
    let numb = [];
    let millionNumb = -1;

    for(let i = 0; i < strToArr.length; i++) {
        if (strToArr[i].includes('million')) {
            million = strToArr.slice(0, i);
            millionNumb = i;
        }
        if (strToArr[i].includes('thousand')) {
            if (millionNumb === -1) {
                thousand = strToArr.slice(0, i)
            } else {
                thousand = strToArr.slice(millionNumb+1, i)
            }
            if (i !== strToArr.length -1) numb = strToArr.slice(i + 1, strToArr.length)
        }
    }

    if (million.length === 0 && thousand.length === 0) numb = string.split(' ');
    if (million.length > 0 && thousand.length === 0) numb = strToArr.slice(millionNumb+1, strToArr.length);

    return Number(arrayToNum(million) * 1e6 + arrayToNum(thousand) * 1e3 + arrayToNum(numb));
}


console.log(parseInt("one"));
console.log(parseInt("two hundred forty-six" ));
console.log(parseInt("seven hundred eighty-three thousand nine hundred and nineteen"));
console.log(parseInt('five millions two thousand and one'));
console.log(parseInt('two millions five'))
console.log(parseInt('two hundred forty-two thousand two hundred ten'));
