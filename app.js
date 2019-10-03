// Module Imports

    // Node.js Modules
    const http = require('http');
    const path = require('path');

    // NPM modulesthe
    const express = require('express');
    const helmet = require('helmet');
    const bodyParser = require('body-parser');

    // Local modules
    const rootDir = require('./util/path');
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

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(rootDir, 'views', '404.html');
});

// Start Server
const server = http.createServer(app);
server.listen(3000);