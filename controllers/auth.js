const cookieSplitter = require('../util/cookieExtractor');

// export controller functions

    exports.getLogin = (req, res, next) => {
        // Max's cookie splitting
            // const isLoggedIn = req
            //     .get('Cookie')
            //     .split(';')[1]
            //     .trim()
            //     .spit('=')[1]

        // My cookie splitting imported from the util folder
            // const cookies = cookieSplitter(req.get('Cookie')); 

        // Cookie splitting using the npm package cookie-parser in app.js
            const isLoggedIn = req.cookies.loggedIn === 'true';
            console.log(isLoggedIn)

        res.render('auth/login', {
            isAuthenticated: isLoggedIn,
            docTitle: 'Login',
            path: '/login'
        });
    }

    exports.postLogin = (req, res, next) => {
        res.cookie('atest', 'true');
        res.cookie('aatesdt', 'true');
        res.cookie('tesdft', 'true');
        res.cookie('tesfdst', 'true');
        res.cookie('loggedIn', 'true');
        res.cookie('tefdsafsdst', 'true');
        res.cookie('tefdsafsdalkjst', 'true');
        res.cookie('fdsafdsafdsafdsa');
        res.redirect('/');
    }