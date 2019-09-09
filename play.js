const name = "Martin";
let age = 30;
const hasHobbies = true;

// name = "Mars"; // This creates an error because the variable is a const and thus cannot be changed.
age = 50;

// const summarizeUser = function (userName, userAge, userHasHobby) { // --> named function in constant
const summarizeUser = (userName, userAge, userHasHobby) => { // --> Arrow function. The diffrence except for the syntax is how the 'this' keyword behaves.
   return (
       `Name is ${userName}, age is ${userAge}, and the user has hobbies: ${userHasHobby}`
   );
}

const add = (a,b) => {
    return a + b;
}

const subtract = (a,b) => a - b; // --> shortform arrow function possible only when function only has a return statement

const addOne = a => a + a; // --> when arrow function only has one argument the paranthases can be omitted

const addRandom = () => Math.floor(Math.random()*10); // --> when arrow function does not have any arguments we have to include the parentasies.

console.log(summarizeUser(name, age, hasHobbies));
console.log(add(1,2));
console.log(subtract(2,1));
console.log(addOne(1));
console.log(addRandom());