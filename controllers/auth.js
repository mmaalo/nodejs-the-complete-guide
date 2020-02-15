const User = require('../models/user');
const bcrypt = require('bcryptjs');

// export controller functions

    exports.getLogin = (req, res, next) => {
        res.render('auth/login', {
            isAuthenticated: req.session.isLoggedIn,
            docTitle: 'Login',
            path: '/login'
        });
    }

    exports.postLogin = (req, res, next) => {
        User.findById("5e232e02252a6a2e3f0b3df8")
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            req.session.save((err) => {
                console.log(err);
                res.redirect('/');
            });
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
            path: '/singup'
        });
    }

    exports.postSignup = (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;
        User.findOne( { email: email } )
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/signup');
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            if (hashedPassword) {
                const user = new User({
                    email: email,
                    password: hashedPassword,
                    cart: {
                        items: []
                    }
                });
                return user.save();
            }

        })
        .then(savedUser => {
            if (savedUser) {
                res.redirect('/login');
            } 
        })
        .catch(err => {
            console.log(err);
        })

    }