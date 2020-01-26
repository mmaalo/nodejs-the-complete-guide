// export controller functions

    exports.getLogin = (req, res, next) => {
        // Max's cookie splitting
            // const isLoggedIn = req
            //     .get('Cookie')
            //     .split(';')[1]
            //     .trim()
            //     .spit('=')[1]

        // My cookie splitting imported from the util folder
            // const cookiesToObject = require('../util/cookiesToObject');
            // const cookies = cookiesToObject(req.get('Cookie'), {all: true}); 

        // Cookie splitting using the npm package cookie-parser in app.js
            const isLoggedIn = req.cookies.loggedIn === 'true';

        res.render('auth/login', {
            isAuthenticated: isLoggedIn,
            docTitle: 'Login',
            path: '/login'
        });
    }

    exports.postLogin = (req, res, next) => {
        res.cookie('loggedIn', 'true', {maxAge: 604800000, httpOnly: true});
        res.redirect('/');
    }