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
            const db = require('./util/database');

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

    db.execute('SELECT * FROM products').then().catch();

    app.use(errorController.get404);

// Start Server
const server = http.createServer(app);
server.listen(3000);