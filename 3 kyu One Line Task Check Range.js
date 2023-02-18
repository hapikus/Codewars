// https://www.codewars.com/kata/591e833267cd75cb02000007

// checkRange=(a,x,y)=>a.filter(e=>e<x==e>y).length

// checkRange=(a,x,y,s=0)=>a.map(e=>s+=e<x==e>y)

// | - побитовое или
checkRange=(a,x,y,s=0)=>a.map(e=>s+=e<x==e>y)|s

// checkRange=(a,x,y)=>a.reduce((a,e)=>e<x==e>y,0)

// checkRange=(a,x,y)=>a.map(e=>e<x==e>y)
// b=>!(y<b|x>b)

// checkRange=(a,x,y)=>a.reduce((a,e)=>a+=e<x==e>y,0)

// sd=x=>+`${x}`.replace(/./g,a=>a*a)

// checkRange=(a,x,y)=>`${a}`.match(/./g)

// checkRange=(a,x,y)=>(a.reduce((a,e)=>a+=(e<x==e>y),0))



//checkRange=(a,x,y)=>(a.map(e=>e<=e&&e<=y));

// e-x<=x-y

console.log(checkRange([2, 5, 6, 7, 1, 3, 4, 11, 56, 49],1,7)); // 7
// console.log(checkRange([2, 5, 6, 7, 1, 3, 4, 11, 56, 49],3,5)); // 3
// console.log(checkRange([2, 5, 6, 7, 1, 3, 4, 11, 56, 49],7,10)); // 1
// console.log(checkRange([7, 5, 11, 8, 9, 1, 13, 12, 88],99,100)); // 0
// console.log(checkRange([12, 1, 45, 56, 98, 14, 23, 46],14,14)); // 1
// console.log(checkRange([1, 1, 1, 99, 99, 99],88,88)); //0)