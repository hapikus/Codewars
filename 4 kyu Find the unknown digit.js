// https://www.codewars.com/kata/546d15cebed2e10334000ed9/train/javascript

function solveExpression(exp) {

    function zeroCheck(str) {
        let regExp = /[-+=]0{1}\d/;
        // console.log(str, str.search(regExp))
        return str.search(regExp) === -1;
    }

    let options = '';
    for (let i = 0; i < 10; i++) {
        if (!exp.includes(String(i))) options += i;
    }

    let expWithoutQuestion;
    for (let i = 0; i < options.length; i++) {
        expWithoutQuestion = ''
        for (let j = 0; j < exp.length; j++) {
            if (exp[j] === '?') {
                expWithoutQuestion += options[i];
            } else {
                expWithoutQuestion += exp[j];
            }
        }
        // [number1][op][number2]=[number3]
        let number1 = parseInt(expWithoutQuestion);
        let op = expWithoutQuestion[String(number1).length];
        let number2 = parseInt(expWithoutQuestion.slice(String(number1).length + 1));
        let number3 =  parseInt(expWithoutQuestion.slice(String(number1).length + String(number2).length + 2));

        switch (op) {
            case '+':
                if (+number1 + +number2 === +number3 && zeroCheck(expWithoutQuestion)) {
                    return Number(options[i]);
                }
                break;
            case '-':
                if (+number1 - +number2 === +number3 && zeroCheck(expWithoutQuestion)) {
                    return Number(options[i]);
                }
                break;
            case '*':
                if (+number1 * +number2 === +number3 && zeroCheck(expWithoutQuestion)) {
                    return Number(options[i]);
                }
                break;
        }
    }
    return -1
}

console.log(solveExpression('1+1=?')); // 2
console.log(solveExpression('123*45?=5?088')); // 6
console.log(solveExpression('-5?*-1=5?')); // 0
console.log(solveExpression('19--45=5?')); // -1
console.log(solveExpression('??*??=302?')); // 5
console.log(solveExpression('?*11=??')); // 2
console.log(solveExpression('??*1=??')); // 2
console.log(solveExpression('??+??=??')); // -1
console.log(solveExpression('-7715?5--484?00=-28?9?5')); // 6