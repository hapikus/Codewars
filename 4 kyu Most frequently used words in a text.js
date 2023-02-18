// https://www.codewars.com/kata/51e056fe544cf36c410000fb/train/javascript

function topThreeWords(text) {
    let wordsMap = new Map();
    const regex = /[,#:\\\/.{2}]/g;

    // count words
    for (let word of text.split(' ')) {
        word = word.toLowerCase().trim();
        word = word.replace(regex,'');
        if (word === '' ||word === "'") continue
        if (!wordsMap.has(word)) {
            wordsMap.set(word, 1);
        } else {
            wordsMap.set(word, wordsMap.get(word) + 1);
        }
    }

    // find top 3
    let array = [...wordsMap];
    array.sort((elem1, elem2) => {
        if (elem1[1] === elem2[1]) {
            return elem1[0] > elem2[0] ? 1: -1;
        }
        return elem2[1] - elem1[1];
    });

    let answer = [];
    for (let i = 0; i < Math.min(3, array.length); i++) {
        answer.push(array[i][0]);
    }

    return answer
}


console.log(topThreeWords("a a  b  c c  d d d d  e e e e e")); // ['e','d','a']
console.log(topThreeWords("a a c b b")); // ['a','b','c']
console.log(topThreeWords("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")); // ['e','ddd','aa']
console.log(topThreeWords("  //wont won't won't ")); // ["won't", "wont"]
console.log(topThreeWords("  , e   .. ")); // ["e"]
console.log(topThreeWords("  ...  ")); // []