// imports
    
    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router(); 
        const bodyParser = require('body-parser');
        const urlendcoded = bodyParser.urlencoded({extended: true});

    // local imports
        let userData = require('./indexRoute');
        const users = userData.users;
        
// routes

router.get('/users', (req, res, next) => {
    res.render('users', {
        docTitle: 'Users',
        users: users,
        exists: userData.exists
    });
});

module.exports = router;