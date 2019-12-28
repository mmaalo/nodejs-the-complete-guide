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
            const sequelize = require('./util/database');

        // database models
            const Product = require('./models/product');
            const User = require('./models/user');

// Main App Middleware
    const app = express();
    app.use(helmet());

    // Set Templating engine and template folder
    app.set('view engine','ejs');
    app.set('veiws', 'views');

    // Set static folder
    app.use(express.static(path.join(rootDir, 'public')));

// Routes Middleware
    app.use('/admin', adminRoutes);
    app.use(shopRoutes);
    app.use(errorController.get404);

// Database, sequelize middleware & start server

    // Define relations between models
        Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
        // User.hasMany(Product); // This defines the opposite of the line above

    // Sync sequelize tables
        sequelize
        .sync({ force: true}) // sequelize.sync() syncs all the tables we define with the database, force: true will drop existing and create new tables if there are any changes to our tables.
        .then(result => {
        // console.log(result);

        // Start server
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })
