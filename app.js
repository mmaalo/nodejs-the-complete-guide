// Module Imports

    // Node.js Modules
    const http = require('http');
    const path = require('path');

    // NPM modulesthe
    const express = require('express');
    const helmet = require('helmet');

    // Local modules
    const rootDir = require('./util/path');
    const adminRoutes = require('./routes/admin');
    const shopRoutes = require('./routes/shop');

// Main App Middleware
const app = express();
app.use(helmet());
app.use(express.static(path.join(rootDir, 'public')));

// Routes Middleware

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

// Start Server
const server = http.createServer(app);
server.listen(3000);