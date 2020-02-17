const User = require('../models/user');
const bcrypt = require('bcryptjs');

// export controller functions

    exports.getLogin = (req, res, next) => {
        res.render('auth/login', {
            isAuthenticated: req.session.isLoggedIn,
            docTitle: 'Login',
            path: '/login',
            errorMessage: req.flash('errorMessage')
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
            })
        })
        .catch(err => {
            console.log(err);
        })

    }