// https://www.codewars.com/kata/52d1bd3694d26f8d6e0000d3/train/javascript

function VigenèreCipher(key, abc) {

    let VigenèreSquare = Array.apply(null, Array(abc.length)).map(_ => abc);
    for (let i = 1; i < VigenèreSquare.length; i ++) {
        VigenèreSquare[i] = VigenèreSquare[i].slice(i) + VigenèreSquare[i].slice(0, i)
    }

    this.encode = function (str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            if ( abc.indexOf(str[i]) !== -1) {
                result += VigenèreSquare[abc.indexOf(key[i % key.length])][abc.indexOf(str[i])];
            } else {
                result += str[i];
            }
        }
        return result;
    };

    this.decode = function (str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            if ( abc.indexOf(str[i]) !== -1) {
                result += abc[VigenèreSquare[abc.indexOf(key[i % key.length])].indexOf(str[i])];
            } else {
                result += str[i];
            }
        }
        return result;
    };
}

function VigenèreCipher1(key, abc) {

    this.abc = abc.split('');
    this.key = key.split('');

    this.encode = function (str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            if ( this.abc.indexOf(str[i]) !== -1) {
                result += String.fromCharCode( abc.charCodeAt(0) + (str.charCodeAt(i)  - abc.charCodeAt(0) + ( (key.charCodeAt(i % key.length) - abc.charCodeAt(0)) % abc.length)) % abc.length);
            } else {
                result += str[i];
            }
        }

        return result;
    };

    this.decode = function (str) {
        let result = '';

        for (let i = 0; i < str.length; i++) {
            if ( this.abc.indexOf(str[i]) !== -1) {
                if (str.charCodeAt(i) - key.charCodeAt(i % key.length) < 0) {
                    result += String.fromCharCode( abc.charCodeAt(0) + abc.length + str.charCodeAt(i) - (key.charCodeAt(i % key.length)))
                } else {
                    result += String.fromCharCode(abc.charCodeAt(0) + str.charCodeAt(i) - (key.charCodeAt(i % key.length)));
                }
            } else {
                result += str[i];
            }
        }

        return result
    };
}

let abc = "abcdefghijklmnopqrstuvwxyz";
let key = "password"
c = new VigenèreCipher(key, abc);

console.log(c.encode('codewars')); // 'rovwsoiv'
console.log(c.decode('rovwsoiv')); // 'codewars'

console.log(c.encode('waffles')); // 'laxxhsj'
console.log(c.decode('laxxhsj')); // 'waffles'