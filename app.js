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

            const Cart = require('./models/cart');
            const CartItem = require('./models/cart-item');

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
        User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
    });

// Routes Middleware
    app.use('/admin', adminRoutes);
    app.use(shopRoutes);
    app.use(errorController.get404);

// Database, sequelize middleware & start server

    // Define relations between models
        Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
        User.hasMany(Product);

        User.hasOne(Cart);
        Cart.belongsTo(User);
        Cart.belongsToMany(Product, { through: CartItem });
        Product.belongsToMany(Cart, { through: CartItem });

    // Sync sequelize tables
        sequelize
        .sync({ force: true}) // sequelize.sync() syncs all the tables we define with the database, force: true will drop existing and create new tables.
        // .sync()
        .then(result => {
            return User.findByPk(1);
        })
        .then(user => {
            if (!user) {
                return User.create({name: 'User', email: 'mail@mail.com'});
            } 
            return user;
        })
        .then(user => {
            // console.log(user)
            // Start server
            app.listen(3000);
        })
        .catch(err => {
            console.log(err);
        })
