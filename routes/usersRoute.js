// imports
    
    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router(); 
        const bodyParser = require('body-parser');
        const urlendcoded = bodyParser.urlencoded({extended: true});

    // local imports
        const indexData = require('./indexRoute')

// routes

router.get('/users', (req, res, next) => {
    let userExists;
    if (indexData.exists == 'true') {
       userExists = true; 
    } else {
        userExists == false;
    }
    res.render('users', {
        docTitle: 'Users',
        activeUsers: true,
        users: indexData.users,
        exists: userExists 
    });
});


module.exports = router;