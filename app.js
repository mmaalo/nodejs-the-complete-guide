// Module Imports

    // Node.js Modules
    const http = require('http');
    const path = require('path');

    // NPM modules
    const express = require('express');
    const helmet = require('helmet');
    const mongoose = require('mongoose');
    const cookieParser = require('cookie-parser');

    // Local modules
    const rootDir = require('./util/rootDir');

        // routes
            const adminRoutes = require('./routes/admin');
            const shopRoutes = require('./routes/shop');
            const authRoutes = require('./routes/auth');
        
        // controllers
            const errorController = require('./controllers/error');

        // User
            const User = require('./models/user');

// Main App Middleware
    const app = express();
    app.use(helmet());
    app.use(cookieParser());

    // Set Templating engine and template folder
    app.set('view engine','ejs');
    app.set('veiws', 'views');

    // Set static folder
    app.use(express.static(path.join(rootDir, 'public')));

    // Get dummy user form db and store it in the request
    app.use((req, res, next) => {
        User.findById("5e232e02252a6a2e3f0b3df8")
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
    });

// Routes Middleware
    app.use('/admin', adminRoutes);
    app.use(shopRoutes);
    app.use(authRoutes);
    app.use(errorController.get404);


// Connect to database and start server
    mongoose
    .connect(
        'mongodb+srv://user:user@nodejs-2k1so.mongodb.net/shop', 
        { useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(result => {
        User.findOne()
        .then(user => {
            if (!user) {
                const user = new User({
                    name: 'user',
                    email: 'user@user.com',
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(3000);
    })
    .catch(err => console.log(err));