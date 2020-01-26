// export controller functions

    exports.getLogin = (req, res, next) => {
        res.render('auth/login', {
            isAuthenticated: req.isLoggedIn,
            docTitle: 'Login',
            path: '/login'
        });
    }

    exports.postLogin = (req, res, next) => {
        req.isLoggedIn = true;
        console.log(req.isLoggedIn);
        res.redirect('/');
    }