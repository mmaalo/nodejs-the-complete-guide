// Module Imports

    // Node.js Modules
    const http = require('http');

    // NPM modules
    const express = require('express');
    const helmet = require('helmet');
    const bodyParser = require('body-parser');

    // Local modules

// Main App Middleware
const app = express();
app.use(helmet());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

const urlencodedParser = bodyParser.urlencoded({extended: true});

// Routes Middleware
app.use('/', (req, res, next) => {
    console.log('this middleware always runs');
    next();
});

app.use('/add-product', (req, res, next) => {
    console.log(`I'm the add-product middleware`);
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Add Product Page</title>
        </head>
        <body>
            <form action="/product" method="post">
                <input type="text" name="title">
                <button type="submit">Add Product</button>
            </form>
        </body>
        </html>
    `);
});

app.use('/product', urlencodedParser, (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    console.log(`I'm the catch all middleware`);
    res.send(`<h1>Hello From Express!</h1>`);
});


// Start Server
const server = http.createServer(app);
server.listen(3000);