// Module Imports

    // Node.js Modules
    const http = require('http');
    const path = require('path');

    // NPM modulesthe
    const express = require('express');
    const helmet = require('helmet');

    // Local modules
    const rootDir = require('./util/rootDir');

        // routes
            // const adminRoutes = require('./routes/admin');
            // const shopRoutes = require('./routes/shop');
        
        // controllers
            const errorController = require('./controllers/error');

        // database
        const mongoConnect = require('./util/database'); 

// Main App Middleware
    const app = express();
    app.use(helmet());

    // Set Templating engine and template folder
    app.set('view engine','ejs');
    app.set('veiws', 'views');

    // Set static folder
    app.use(express.static(path.join(rootDir, 'public')));

    // Get dummy user form db and store it in the request
    // app.use((req, res, next) => {
    //     User.findByPk(1)
    //     .then(user => {
    //         req.user = user;
    //         next();
    //     })
    //     .catch(err => console.log(err));
    // });

// Routes Middleware
    // app.use('/admin', adminRoutes);
    // app.use(shopRoutes);
    app.use(errorController.get404);


// Connect to database and start server
    mongoConnect((client) => {
        console.log(client)
        app.listen(3000)
    });
