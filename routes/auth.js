// imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended: true});

    // local imports
        const authController = require('../controllers/auth');

// Routes

    router.get('/login', authController.getLogin);
    
    router.post('/login', urlencodedParser, authController.postLogin);

    router.post('/logout', urlencodedParser, authController.postLogout);

module.exports = router;