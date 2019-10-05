// imports
    
    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router(); 
        const bodyParser = require('body-parser');
        const urlendcoded = bodyParser.urlencoded({extended: true});

    // local imports
        const indexData = require('./indexRoute');

// routes

router.get('/users', (req, res, next) => {
    res.render('users', {
        docTitle: 'Users',
        path: '/users',
        users: indexData.users,
        exists: indexData.exists
    });
});

module.exports = router;