// imports

    // core imports
        const crypto = require('crypto');

    // npm imports
        const bcrypt = require('bcryptjs');
        const flashMessage = require('../util/flashMessage');
        const sgMail = require('@sendgrid/mail');
        const { validationResult } = require('express-validator');

    // local imports  
        const User = require('../models/user');
        const sendgrid_API_KEY = require('../sendgrid_API_KEY');

// init
    sgMail.setApiKey(sendgrid_API_KEY);

// export controller functions

    exports.getLogin = (req, res, next) => {
        return res.render('auth/login', {
            isAuthenticated: req.session.isLoggedIn,
            docTitle: 'Login',
            path: '/login',
            errorMessage: flashMessage(req.flash('errorMessage')),
            oldInput: { email: '', password: '' },
            validationErrors: []
        });
    }

    exports.postLogin = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const errors = validationResult(req);

        /**
         * @description Renders the login page. You can define the errorMessage, oldInput and validationErrors that is passed to the login page as key value pairs in a object. If not defined standard values will be used.
         * @param {{ errorMessage: string, oldInput: {}, validationErrors: [] }} input
         */
        const renderLogin = (input) => {
            let errorMessage = 'Invalid Email or Password';
            let oldInput = { email: email, password: password }
            let validationErrors = [{param: 'email'}, {param: 'password'}]

            if (typeof input !== 'undefined') {
                if (input.errorMessage) {
                errorMessage = input.errorMessage; 
                }
                if (input.oldInput) {
                    oldInput = input.oldInput;
                }
                if (input.validationErrors) {
                    validationErrors = input.validationErrors;
                }
            }
            return res.status(422).render('auth/login', {
                isAuthenticated: false,
                docTitle: 'Login',
                path: 'login',
                errorMessage: errorMessage,
                oldInput: oldInput,
                validationErrors: validationErrors
            });

        }

        if (!errors.isEmpty()) {
            return renderLogin({
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            })
        } 
        User.findOne( { email: email } )
        .then(user => {
            if (!user) {
                return renderLogin();
            }
            bcrypt.compare(password, user.password)
            .then(doMatch => {
                if (doMatch) {
                    req.session.user = user;
                    req.session.isLoggedIn = true;
                    return req.session.save(() => {
                        res.redirect('/');
                    });
                }
                return renderLogin();
            })
            .catch(err => {
                console.log(err);
                return renderLogin();
            })
        })
        .catch(err => console.log(err));
    }

    exports.postLogout = (req, res, next) => {
        req.session.destroy((err) => {
            if (err) {console.log(err)};
            res.redirect('/');
        });
    }

    exports.getSignup = (req, res, next) => {
        res.render('auth/signup', {
            isAuthenticated: false,
            docTitle: 'Singup',
            path: '/singup',
            errorMessage: flashMessage(req.flash('errorMessage')),
            oldInput: {email: '', password: '', confirmPassword: ''},
            validationErrors: []
        });
    }

    exports.postSignup = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errors: ', errors.array());
            return res.status(422).render('auth/signup', {
                isAuthenticated: false,
                docTitle: 'Singup',
                path: '/singup',
                errorMessage: errors.array()[0].msg,
                oldInput: {email: email, password: password, confirmPassword: confirmPassword},
                validationErrors: errors.array()
            });
        }
        bcrypt.hash(password, 12)
        .then(hashedPassword => {
                const user = new User({
                    email: email,
                    password: hashedPassword,
                    cart: {
                        items: []
                    }
                });
                return user.save();

        })
        .then(() => {
            res.redirect('/login');
            return sgMail.send({
                    to: email,
                    from: 'signup-nodecomplete@test123.com',
                    subject: 'Signup Successful',
                    html: `<h1>You Have Successfully Signed Up!</h1>`
            });
        })
        .catch(err => console.log(err));
    }


    exports.getReset = (req, res, next) => {
        res.render('auth/reset', {
            isAuthenticated: req.session.isLoggedIn,
            docTitle: 'Reset Password',
            path: '/reset',
            errorMessage: flashMessage(req.flash('error')) 
        });
    }

    exports.postReset = (req, res, next) => {
        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                console.log(err);
                return res.redirect('/reset');
            }
            const token = buffer.toString('hex');
            User.findOne({email: req.body.email})
            .then(user => {
                if (!user) {
                    req.flash('error', 'No account with that user found');
                    res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + (1000 * 60 * 60);
                user.save();
                return user;
            })
            .then(user => {
                console.log('logging user again', user);
                res.redirect('/login');
                return sgMail.send({
                    to: user.email,
                    from: 'email@test123.com',
                    subject: 'Reset Password',
                    html: `<h1>your resett password link is <a href="http://www.localhost:3000/reset/${user.resetToken}">here</a> and it is valid for one hour.</h1>`
                });
            })
            .catch(err => console.log(err));
        });   
    }

    exports.getNewPassword = (req, res, next) => {
        const token = req.params.token;
        User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
        .then(user => {
            if (!user) {
                req.flash('error', 'Reset link expired or no such user exists');
                return res.redirect('/login');
            }
            res.render('auth/new-password', {
                isAuthenticated: req.session.isLoggedIn,
                docTitle: 'New Password',
                path: '/new-password',
                errorMessage: flashMessage(req.flash('error')),
                userId: user._id.toString(),
                passwordToken: token
            });
        })
        .catch(err => console.log(err));
    }

    exports.postNewPassword = (req, res, next) => {
        const newPassword = req.body.password;
        const userId = req.body.userId;
        const token = req.body.passwordToken;
        let resetUser;

        User.findOne({
            resetToken: token, 
            resetTokenExpiration: { $gt: Date.now() },
            _id: userId
        })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, 12)
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = undefined;
            resetUser.resetTokenExpiration = undefined;
            return resetUser.save();
        })
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => console.log(err));
    }