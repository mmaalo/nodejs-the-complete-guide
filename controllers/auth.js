// imports

    // npm imports
        const bcrypt = require('bcryptjs');
        const flashMessage = require('../util/flashMessage');
        const nodemailer = require('nodemailer');
        const sendgridTransport = require('nodemailer-sendgrid-transport');

    // local imports  
        const User = require('../models/user');

// init
    const transporter = nodemailer.createTransport(sendgridTransport({
        auth: {
            api_key: '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'
        }
    }))

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
                return transporter.sendMail({
                    to: email,
                    from: 'shop@node-complete.com',
                    subject: 'Signup Succeeded',
                    html: `<h1>You Successfully Signed Up!</h1>`
                });
            })
            .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err);
        })

    }