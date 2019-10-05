// imports

    // core imports
        const http = require('http');
        const path = require('path');
    
    // npm imports
        const express = require('express');
        const helmet = require('helmet');

    // local imports
        const rootDir = require('./util/rootDir');
        const indexRoute = require('./routes/indexRoute');
        const usersRoute = require('./routes/usersRoute');

// middleware
    const app = express();
    app.use(helmet());

    app.use(express.static(path.join(rootDir, 'public')));

// routes
    app.use(indexRoute);
    app.use(usersRoute);

    app.use((req, res, next) => {
        res.status(404).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Page Not Found</title>
            <link rel="stylesheet" href="/css/main.css">
        </head>
        <body>
            <header class="main-header">
                <nav class="main-header__nav">
                    <ul class="main-header__item-list">
                        <li class="main-header__item"><a href="/">Home</a></li>
                        <li class="main-header__item"><a href="/users">Users</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Page Not Found</h1>
            </main>
        </body>
        </html>>
        `);
    });

// start server
    const server = http.createServer(app);
    server.listen(3000);