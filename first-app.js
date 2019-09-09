const fs = require('fs');

const message = 'Hello from Node.js';
const filename = 'hello.txt'

fs.writeFileSync(filename, message);
console.log(`"${message}" has been stored in ./${filename}`);