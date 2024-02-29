function triple(x){
    return 3*x
}
//facon de faire une fonction
let triple=(x)=>3*x;
//fonction avec une variable
let myFct=function(x){
    return 2*x
}
let result =triple(10);
let result1=myFct(10);

function quadruple(myFct,x){
    let result=myFct(x);
    return result*2
}
//tableau d'animal
const animals=[{name:"pluto",race:"chien"},
    {name:"gertrude",race:"perruche"},
    {name:"king",race:"lion"}];

console.log(animals);
//facon 1
let isLion=(animal)=>animal.race==="lion";

//facon 2
const momo= animals.filter((animal)=>
{return animal.race==="lion"});

console.log(momo);
let filterResult=[];

for(let index=0;index<animals.length;index++){
    const animal=animals[index];
    if(animal.race==="lion")
        filterResult.push(animal);
}
console.log(filterResult);

let result2=quadruple(myFct,10);
console.log(result);