const person = {
    name: "Martin", // This is a key value pair. here "name:" = key and "Martin" = value
    age: 30,
    height: 181,
    // The scope of the greet function is the global scope outside the object. To avoid getting undefined use one of the other methods
    greet: () => {
        console.log(`Hi I am ${this.name}`);
    },
    hello: () => {
        console.log(`Hi I am ${person.name}`);
    },
    old: function() {
        console.log(`Hi I am ${this.age} years old`);
    },
    tall() {
        console.log(`Hi I am ${this.height}cm tall`);
    }
};

// Regular long form method for accessing object values
const printName1 = (personData) => {
    console.log(personData.name);
}
printName1(person); 

// Object Desturcturing lets us access values of a of the name we specify in any object, making reusing functions easy
const printName2 = ({ name ,age, greet}) => {
    console.log(name, age, greet); 
}
printName2(person); // When we call the function printName1 we specify witch object we want to access the name, age and greet values for.

const {name, age} = person; // We can also destructure by placeing the curlybrackets on the left side of the equal sign and creating new constants for the values from the person object
console.log(name, age);

// With Array destructering we can make up any names that we want because array have no names for their values
const hobbies = ['Sports', 'Cooking'];
const [hobby1, hobby2] = hobbies;


console.log(hobby1, hobby2);


// for (let hobby of hobbies) {
//     console.log(hobby);
// }


// console.log(person);
// person.greet();
// person.hello();
// person.old();
// person.tall();

// console.log(hobbies.map(hobby => `Hobby: ${hobby}`)); // .map creates a new array and does not edit the old one.
// console.log(hobbies);

// hobbies.push('Programming');
// console.log(hobbies); // Reference types like Arrays and Objects can be edited even tough they are defined as const by using the built in js methods. When we do that the refrerence pointer to the array or object is not changed only the array or object itself. This is not possible with primitive types like strings, numbers ect.

// spread operator:

// const copiedArray1 = hobbies.slice();

// the spread operator (...) takes out all the content of the array or object it is used on and puts it into whatever it placed inside ([...x] or {...x}).
// const copiedArray2 = [...hobbies]; 
// const copiedArray3 = {...hobbies};
// const copiedObject1 = {...person};
// const copiedObject2 = [...copiedArray3]; A object can not be copied into a array with the spread operator

// console.log(copiedArray1);
// console.log(copiedArray2, copiedArray3);
// console.log(copiedObject1);

// rest operator:

// The toArray function below works but is not wery flexible as we are bound to the maximum number of arguments we define in the function.
// const toArray = (arg1, arg2, arg3) => { 
//     return [arg1, arg2, arg3];
// };


// Here the ... in front of args is the rest operator. It turns however many arguments we enter into a array. Very handy indeed.
// const toArray = (...args) => {
//     return args;
// };

// console.log(toArray(1,2,3,4))