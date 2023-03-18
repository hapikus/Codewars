// https://www.codewars.com/kata/55983863da40caa2c900004e/train/javascript

function nextBigger(n){
    const numbers = (n+'').split('');
    const results = []
    for (let i = numbers.length; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            const temp = [...numbers];
            if (numbers[j] < numbers[i]) {
                [temp[i], temp[j]] = [temp[j], temp[i]];
                const sortParth = temp.slice(j+1).sort((a,b) => a - b);
                results.push(Number(temp.slice(0, j+1).join('') + sortParth.join('')));
            }
        }
    }
    const [result] = results.sort((a, b) => a - b).filter(res => res > n);
    return result ? result : -1;
}


console.log(nextBigger(12)); //21
console.log(nextBigger(513)); //531
console.log(nextBigger(2017)); //2071
console.log(nextBigger(414)); //441
console.log(nextBigger(144)); //414
