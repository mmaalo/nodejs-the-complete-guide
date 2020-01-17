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
            const adminRoutes = require('./routes/admin');
            const shopRoutes = require('./routes/shop');
        
        // controllers
            const errorController = require('./controllers/error');

        // database
            const mongoConnect = require('./util/database').mongoConnect; 

        // User
            const User = require('./models/user');

// Main App Middleware
    const app = express();
    app.use(helmet());

    // Set Templating engine and template folder
    app.set('view engine','ejs');
    app.set('veiws', 'views');

    // Set static folder
    app.use(express.static(path.join(rootDir, 'public')));

    // Get dummy user form db and store it in the request
    app.use((req, res, next) => {
        User.findById("5e2116e9d0cc3d64da4e0b4f")
        .then(user => {
            req.user = new User(user.username, user.email, user.cart, user._id)
            next();
        })
        .catch(err => console.log(err));
    });

// Routes Middleware
    app.use('/admin', adminRoutes);
    app.use(shopRoutes);
    app.use(errorController.get404);


// Connect to database and start server
    mongoConnect(() => {
        app.listen(3000)
    });
