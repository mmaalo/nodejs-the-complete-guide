// imports

    // core imports
        const http = require('http');
        const path = require('path');
    
    // npm imports
        const express = require('express');
        const helmet = require('helmet');

    // local imports
        const rootDir = require('./util/rootDir');
        const indexData = require('./routes/indexRoute');
        const usersRoute = require('./routes/usersRoute');

// middleware
    const app = express();
    app.use(helmet());

    app.use(express.static(path.join(rootDir, 'public')));

    app.set('view engine', 'pug');
    app.set('views', 'views');

// routes
    app.use(indexData.router);
    app.use(usersRoute);

    app.use((req, res, next) => {
        res.render('404', {
            docTitle: 'Page Not Found',
            path: ''
        });
    });

// start server
    const server = http.createServer(app);
    server.listen(3000);