// imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended: true});
        const { check, body} = require('express-validator');
        const bcrypt = require('bcryptjs');

    // local imports
        const authController = require('../controllers/auth');
        const User = require('../models/user');

// Routes

    router.get('/login', authController.getLogin);
    
    router.post('/login', 
        urlencodedParser, 
        [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid Email')
                .custom(( value, { req } ) => {
                    return User.findOne( { email: req.body.email } )
                        .then(userDoc => {
                            if (!userDoc) {
                                return Promise.reject('User does not exist or password is wrong');
                            }
                           return true;
                        })
                }),
            body('password')
                .isLength({min: 4, max: 64})
                .isAlphanumeric()
                .withMessage('Please enter a passord between 4 and 64 alphanumeric characters')
                .custom(( value, { req } ) => {
                    return User.findOne( { email: req.body.email } )
                    .then(userDoc => {
                        bcrypt.compare(req.body.password, userDoc.password)
                        .then(doMatch => {
                            if (!doMatch) {
                                return Promise.reject('User does not exist or password is wrong');
                            }
                            return true;
                        })
                    })
                })
        ],
        authController.postLogin);

    router.post('/logout', urlencodedParser, authController.postLogout);

    router.get('/signup', authController.getSignup);

    router.post('/signup', 
        urlencodedParser,
        [
            body('email')
                .isEmail()
                .withMessage('Please enter a valid email')
                .custom((value, {req}) => {
                    // if (value === 'test2@test.com') {
                    //     throw new Error('This email address i forbidden.');
                    // }
                    // return true;
                    return User.findOne( { email: value} )
                        .then(userDoc => {
                            if (userDoc) {
                                return Promise.reject("User already exists");
                            }
                        });
                }),
            body('Please enter a passord between 5 and 64 alphanumeric characters')
                .isLength({min: 5, max: 64})
                .isAlphanumeric(),
            body('confirmPassword')
                .custom((value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error('Password fields must match')
                    } 
                    return true;
                })
        ],
        authController.postSignup);

    router.get('/reset', authController.getReset);

    router.post('/reset', urlencodedParser, authController.postReset);

    router.get('/reset/:token', authController.getNewPassword);

    router.post('/new-password', urlencodedParser, authController.postNewPassword);

module.exports = router;