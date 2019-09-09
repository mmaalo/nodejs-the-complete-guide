const name = "Martin";
let age = 30;
const hasHobbies = true;

// name = "Mars"; // This creates an error because the variable is a const and thus cannot be changed.
age = 50;

function summarizeUser(userName, userAge, userHasHobby) {
   return (
       `Name is ${userName}, age is ${userAge}, and the user has hobbies: ${userHasHobby}`
   );
}
console.log(summarizeUser(name, age, hasHobbies));