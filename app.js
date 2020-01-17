// Module Imports

    // Node.js Modules
    const http = require('http');
    const path = require('path');

    // NPM modulesthe
    const express = require('express');
    const helmet = require('helmet');
    const mongoose = require('mongoose');

    // Local modules
    const rootDir = require('./util/rootDir');

        // routes
            const adminRoutes = require('./routes/admin');
            const shopRoutes = require('./routes/shop');
        
        // controllers
            const errorController = require('./controllers/error');

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
    mongoose
    .connect(
        'mongodb+srv://user:user@nodejs-2k1so.mongodb.net/test', 
        { useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(result => {
        app.listen(3000);
    })
    .catch(err => console.log(err));