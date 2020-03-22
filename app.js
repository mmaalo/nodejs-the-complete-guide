// Module Imports

    // Node.js Modules
    const http = require('http');
    const path = require('path');

    // NPM modules
    const express = require('express');
    const helmet = require('helmet');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');
    const mongoDBStore = require('connect-mongodb-session')(session);
    const csrf = require('csurf');
    const flash = require('connect-flash');

    // Local modules
    const rootDir = require('./util/rootDir');
    const errorfunction = require('./util/errorfunction');

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
    app.use(helmet());
    app.use(cookieParser());

    // Session
    const sessionStore = new mongoDBStore({
        uri: MONGODB_URI,
        collection: 'sessions',
        expires: ONEWEEKINMILLISECONDS,
        connectionOptions: {useNewUrlParser: true, useUnifiedTopology: true}
    });
    app.use(session(
        {
            secret: 'long secure string',
            resave: false,
            saveUninitialized: false,
            store: sessionStore,
            maxAge: ONEWEEKINMILLISECONDS
        }
    ));

    // Enable body parser
    app.use(bodyParser.urlencoded({extended:false}));

    // Enable csrf
    const csrfProtection = csrf();
    app.use(csrfProtection);

    // Enable connect flash
    app.use(flash());

    // Set Templating engine and template folder
    app.set('view engine','ejs');
    app.set('veiws', 'views');

    // Set static folder
    app.use(express.static(path.join(rootDir, 'public')));

    // Set variables that are passed into every view
    app.use((req, res, next) => {
        res.locals.isAuthenicated = req.session.isLoggedIn;
        res.locals.csrfToken = req.csrfToken();
        next();
    });

// // Error Handeling section
//     app.use((req, res, next) => {
//         // throw new Error('sync dummy');

//         User.findById('123456789012')
//         .then(() => {
//             throw new Error('async dummy')
//             next();
//         })
//         .catch(err => {
//             // next(new Error(err));
//             next(errorfunction(500, err))
//         })
//     });

// Routes Middleware
    app.use(authRoutes);
    app.use('/admin', adminRoutes);
    app.use(shopRoutes);

    app.get('/500', errorController.get500);
    app.use(errorController.get404);

    app.use((error, req, res, next) => {
        // res.status(error.httpStatusCode).render();
        // return res.redirect('/500');
        return res.status(500).render('500', {
            docTitle: 'Error',
            isAuthenticated: req.session.isLoggedIn,
            path: '/500'
        });
    });


// Connect to database and start server
    mongoose
    .connect(
        MONGODB_URI, 
        { useNewUrlParser: true, useUnifiedTopology: true}
    )
    .then(() => {
        app.listen(3000);
    })
    .catch(err => {
        throw new Error(`Can't connect to database through mongoose`, console.log(err));
    })