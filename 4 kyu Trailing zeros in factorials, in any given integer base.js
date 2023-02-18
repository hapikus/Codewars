// https://www.codewars.com/kata/544483c6435206617a00012c

function trailingZeros(num, base) {

    class Primes {
        static * stream() {
            let i = 2;
            while (true) {
                if (isPrime(i))
                    yield i;
                i++;
            }
        }
    }

    const isPrime = function(n) {
        if (n <= 3) {
            return n > 1;
        } else if (n % 2 === 0 || n % 3 === 0) {
            return false;
        }

        let i = 5;
        const sqrt = parseInt(Math.sqrt(n));
        while (i <= sqrt) {
            if (n % i === 0 || n % (i + 2) === 0)
                return false;
            i += 6;
        }

        return true;
    }

    const stream = Primes.stream()

    function baseInPrime(n) {
        let primeArray = [stream.next().value];
        let primeMap = new Map();

        let k = 0;
        let checkItPlease = true
        while (n !== 1) {
            let count = 0
            while (n % primeArray[k] === 0) {
                n = n / primeArray[k];
                count += 1;
            }
            if (count > 0) primeMap.set(primeArray[k], count);
            primeArray.push(stream.next().value);
            k += 1;

            // Map(3) { 3 => 1, 31 => 1, 26709773 => 1 }
            if (checkItPlease && primeArray.at(-1) > 10000) {
                if (isPrime(n)) {
                    primeMap.set(n, 1)
                    n = 1;
                } else {
                    checkItPlease = false;
                }
            }
        }

        return primeMap
    }

    let basedOfBase = baseInPrime(base);

    // console.log(basedOfBase);

    let zeroArray = [];

    for (let [key, value] of basedOfBase.entries()) {

        let count = 1;
        let zeroCount = 0

        while ((num / Math.pow(key, count)) > 1) {
            zeroCount += Math.floor(num / Math.pow(key, count));
            count++;
        }

        zeroArray.push(Math.floor(zeroCount / value));
    }

    // console.log(zeroArray)

    return Math.min(...zeroArray);

}

// 961778957! base 27448 should be 13358039
// console.time('FirstWay');
// console.log(trailingZeros(961778957, 27448))
// console.timeEnd('FirstWay');

module.exports = trailingZeros;

