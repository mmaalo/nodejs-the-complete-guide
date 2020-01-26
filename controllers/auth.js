const User = require('../models/user');

// export controller functions

    exports.getLogin = (req, res, next) => {
        res.render('auth/login', {
            isAuthenticated: false,
            docTitle: 'Login',
            path: '/login'
        });
    }

    exports.postLogin = (req, res, next) => {
        User.findById("5e232e02252a6a2e3f0b3df8")
        .then(user => {
            req.session.user = user;
            req.session.isLoggedIn = true;
            res.redirect('/');
        })
        .catch(err => console.log(err));
    }