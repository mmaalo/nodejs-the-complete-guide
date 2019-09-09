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

const hobbies = ['Sports', 'Cooking'];
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

hobbies.push('Programming');
console.log(hobbies); // Reference types like Arrays and Objects can be edited even tough they are defined as const by using the built in js methods. When we do that the refrerence pointer to the array or object is not changed only the array or object itself. This is not possible with primitive types like strings, numbers ect.