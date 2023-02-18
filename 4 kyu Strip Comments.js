// https://www.codewars.com/kata/51c8e37cee245da6b40000bd/train/javascript

function solution(input, markers) {
    let result = '';
    let dontAdd = true;
    for (let i = 0; i < input.length; i++) {

        if (markers.includes(input[i])) {
            dontAdd = false;
            result = result.trim();
        }

        if (['\n'].includes(input[i])) {
            dontAdd = true;
        }

        if (dontAdd) result += input[i];
    }
    return result.trim();
}

console.log(solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"]));