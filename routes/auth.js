// imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended: true});
        const { check } = require('express-validator');

    // local imports
        const authController = require('../controllers/auth');

// Routes

    router.get('/login', authController.getLogin);
    
    router.post('/login', urlencodedParser, authController.postLogin);

    router.post('/logout', urlencodedParser, authController.postLogout);

    router.get('/signup', authController.getSignup);

    router.post('/signup', 
        urlencodedParser, 
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, {req}) => {
                if (value === 'test2@test.com') {
                    throw new Error('This email address i forbidden.');
                }
                return true;
        }),
        authController.postSignup);

    router.get('/reset', authController.getReset);

    router.post('/reset', urlencodedParser, authController.postReset);

    router.get('/reset/:token', authController.getNewPassword);

    router.post('/new-password', urlencodedParser, authController.postNewPassword);

module.exports = router;