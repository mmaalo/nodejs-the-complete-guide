// Module Imports

    // Node.js Modules
    const http = require('http');
    const path = require('path');

    // NPM modules
    const express = require('express');
    const helmet = require('helmet');
    const mongoose = require('mongoose');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');
    const mongoDBStore = require('connect-mongodb-session')(session);

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

        // Constants
            const MONGODB_URI = 'mongodb+srv://user:user@nodejs-2k1so.mongodb.net/shop';
            const ONEWEEKINMILLISECONDS = 1000 * 60 * 60 * 24 * 7;

// Main App Middleware
    const app = express();
    const sessionStore = new mongoDBStore({
        uri: MONGODB_URI,
        collection: 'sessions',
        expires: ONEWEEKINMILLISECONDS,
        connectionOptions: {useNewUrlParser: true, useUnifiedTopology: true}
    });

    app.use(helmet());
    app.use(cookieParser());
    app.use(session(
        {
            secret: 'long secure string',
            resave: false,
            saveUninitialized: false,
            store: sessionStore,
            maxAge: ONEWEEKINMILLISECONDS
        }
    ));

    // Set Templating engine and template folder
    app.set('view engine','ejs');
    app.set('veiws', 'views');

    // Set static folder
    app.use(express.static(path.join(rootDir, 'public')));


// Routes Middleware
    app.use(authRoutes);
    app.use('/admin', adminRoutes);
    app.use(shopRoutes);
    app.use(errorController.get404);


// Connect to database and start server
    mongoose
    .connect(
        MONGODB_URI, 
        { useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => {
        app.listen(3000);
    })
    .catch(err => console.log(err));