// https://www.codewars.com/kata/5519a584a73e70fa570005f5/train/javascript

class Primes {
    static * stream() {
        let n = 1_000_000;
        // const sieve = Array(n).fill(true);
        const sieve = [];

        for (let i = 3; i < n; i += 2) {
            sieve[i] = 1;
        }

        const primes = [2];
        yield primes[0];
        for (let p = 3; p < n; p += 2){
            if (sieve[p]) {
                primes.push(p);
                yield p;
                for (let i = p * p; i < n + 1; i += p)
                    sieve[i] = false;
            }
        }
    }
}

const stream = Primes.stream()

count = 0;
while (true) {
    console.log(stream.next().value)
    count++
    if (count > 10) break
}

