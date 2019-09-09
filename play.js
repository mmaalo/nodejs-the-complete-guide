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

console.log(person);
person.greet();
person.hello();
person.old();
person.tall();