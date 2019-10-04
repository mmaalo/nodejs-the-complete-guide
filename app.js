// Module Imports

    // Node.js Modules
    const http = require('http');
    const path = require('path');

    // NPM modulesthe
    const express = require('express');
    const helmet = require('helmet');

    // Local modules
    const rootDir = require('./util/path');
    const adminData = require('./routes/admin');
    const shopRoutes = require('./routes/shop');

// Main App Middleware
    const app = express();
    app.use(helmet());

    // Set Templating engine and template folder
    app.set('view engine','pug');
    app.set('veiws', 'views');

    // Set static folder
    app.use(express.static(path.join(rootDir, 'public')));

// Routes Middleware
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', {docTitle: 'Page Not Found'});
});

// Start Server
const server = http.createServer(app);
server.listen(3000);