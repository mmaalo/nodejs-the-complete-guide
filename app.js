// Module imports

    // Core Modules
    const path = require('path');

    // NPM modules
    const express = require('express');
    const helmet = require('helmet');

    // Private modules
    const rootDir = require('./util/path');
    const indexRoute = require('./routes/indexRoute');
    const usersRoute = require('./routes/usersRoute');

// App middleware
const app = express();
app.use(helmet());
app.use(express.static(path.join(rootDir, 'public')));

// App Routes
app.use(indexRoute);
app.use(usersRoute);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

// Start app
app.listen(3000);
