// Module Imports

    // Node.js Modules
    const http = require('http');

    // NPM modules
    const express = require('express');
    const helmet = require('helmet');

    // Local modules

// Main app
const app = express();
app.use(helmet());

const server = http.createServer(app);

server.listen(3000);
