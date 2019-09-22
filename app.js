// Module Imports

    // Node.js Modules
    const http = require('http');

    // NPM modulesthe
    const express = require('express');
    const helmet = require('helmet');
    const bodyParser = require('body-parser');

    // Local modules
    const adminRoutes = require('./routes/admin');
    const shopRoutes = require('./routes/shop');

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

app.use(adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>404, Page Not Found</title>
        </head>
        <body>
            <h1>404, Page Not Found</h1>    
        </body>
        </html>
    `);
});

// Start Server
const server = http.createServer(app);
server.listen(3000);