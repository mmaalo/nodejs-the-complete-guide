// imports

    // core imports
        const http = require('http');
        const path = require('path');
    
    // npm imports
        const express = require('express');
        const helmet = require('helmet');
        const expressHbs = require('express-handlebars');

    // local imports
        const rootDir = require('./util/rootDir');
        const indexData = require('./routes/indexRoute');
        const usersRoute = require('./routes/usersRoute');

// middleware
    const app = express();
    app.use(helmet());

    app.engine('hbs', expressHbs({
        extname: 'hbs',
        defaultLayout: 'main-layout',
        layoutsDir: 'views/layouts'
    }));
    app.set('view engine', 'hbs');
    app.set('views', 'views');

    app.use(express.static(path.join(rootDir, 'public')));

// routes
    app.use(indexData.router);
    app.use(usersRoute);

    app.use((req, res, next) => {
        res.render('404', {
            docTitle: 'Page Not Found'
        });
    });

// start server
    const server = http.createServer(app);
    server.listen(3000);