const http = require('http');

// The createServer callback function //
// The createServer callback function //
// The createServer callback function //

// // Long form
// function rqListener(req, res) {
//     console.log(req);
// }
// const server = http.createServer(rqListener);


// // Shorter with anonomys function
// const server = http.createServer(function(req, res) {
//     console.log(req);
// });

// Default with arrow function
const server = http.createServer((req, res) => {
    console.log(req);
    process.exit();
});

// Starting the server //
// Starting the server //
// Starting the server //

server.listen(3000);