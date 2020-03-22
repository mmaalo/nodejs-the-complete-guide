const sum = (a, b) => {
    if (a && b) {
        return a + b;
    }
    throw new Error('invalid arguments');
}

// console.log(sum(1, 1));
// console.log(sum(1));

try {
    console.log(sum(1));
} catch (err) {
    console.log('error occurred!');
    // console.log(err);
}

console.log('This works!');