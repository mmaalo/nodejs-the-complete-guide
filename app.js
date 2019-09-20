// Module Imports

    // Node.js Modules
    const http = require('http');

    // NPM modules
    const express = require('express');
    const helmet = require('helmet');

    // Local modules

// Main app
const app = express();

// Middleware
app.use('/', (req, res, next) => {
    console.log('this middleware always runs');
    next();
});
app.use('/add-product', (req, res, next) => {
    console.log('In another middleware');
    res.send(`<h1>Add a Product</h1>`);
});

app.use('/', (req, res, next) => {
    console.log('In another middleware');
    res.send(`<h1>Hello From Express!</h1>`);
});


// Start Server
const server = http.createServer(app);
server.listen(3000);