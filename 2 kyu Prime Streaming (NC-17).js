// 1.46 start
let bitVector = function(size){
    this.store = Array(~~(size/31)+1).fill(0);
    for (let i=3; i<~~Math.sqrt(size); i+=2) if (!this.isSet(i))
        for (let j=i*i, k=i<<1; j<size; j+=k) this.setBit(j);
}
bitVector.prototype.setBit=function(bit){this.store[~~(bit/31)]|=1<<bit%31;}
bitVector.prototype.isSet=function(bit){return (this.store[~~(bit/31)]&1<<bit%31)>0;}

MAX_PRIME = 480_000_000;
sieve = new bitVector(MAX_PRIME);

class Primes {
    static * stream() {
        yield 2;
        for (let n=3;n<=MAX_PRIME;n+=2) if (!sieve.isSet(n)) yield(n);
    }
}

// 1.46 end

function myMethod() {
    let durationInMs = [];
    let count = 0
    const stream = Primes.stream()

    const startTimeInMs = new Date().getTime();

    while (true) {
        count++;
        if (count >= 25_000_000) {
            console.log(stream.next());
            break;
        }
        stream.next().value;
        // 15.081
        // 1.46

    }

    const endTimeInMs = new Date().getTime();

    durationInMs = (endTimeInMs - startTimeInMs) / 1000;

    return durationInMs

}

console.log(myMethod());