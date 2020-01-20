// export controller functions

    exports.getLogin = (req, res, next) => {
        res.render('auth/login', {
            docTitle: 'Login',
            path: '/login'
        });
    }

    exports.postLogin = (req, res, next) => {
        console.log(req.body);
        res.redirect('/');
    }