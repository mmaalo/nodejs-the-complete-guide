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
        res.render('auth/login', {
            isAuthenticated: req.session.isLoggedIn,
            docTitle: 'Login',
            path: '/login',
            errorMessage: flashMessage(req.flash('errorMessage'))
        });
    }

    exports.postLogin = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne( { email: email } )
        .then(user => {
            if (!user) {
                req.flash('errorMessage', 'Invalid Email or Password');
                return res.redirect('/login');
            } else {

            }
            bcrypt.compare(password, user.password)
            .then(doMatch => {
                if (doMatch) {
                    req.session.user = user;
                    req.session.isLoggedIn = true;
                    return req.session.save((err) => {
                        console.log(err);
                        res.redirect('/');
                    });
                }
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err);
                req.flash('errorMessage', 'Invalid Email or Password');
                res.redirect('/login');
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
            errorMessage: flashMessage(req.flash('errorMessage')) 
        });
    }

    exports.postSignup = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errors: ', errors.array()[0]);
            return res.status(422).render('auth/signup', {
                isAuthenticated: false,
                docTitle: 'Singup',
                path: '/singup',
                errorMessage: JSON.stringify(errors.array())
            });
        }
        User.findOne( { email: email } )
        .then(userDoc => {
            if (userDoc) {
                req.flash('errorMessage', 'User already exists');
                return res.redirect('/signup');
            }
            if (password != confirmPassword) {
                req.flash('errorMessage', 'Passwords must match');
                return res.redirect('/signup');
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
        })
        .catch(err => {
            console.log(err);
        })

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