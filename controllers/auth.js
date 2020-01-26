const cookiesToObject = require('../util/cookiesToObject');

// export controller functions

    exports.getLogin = (req, res, next) => {
        // Max's cookie splitting
            // const isLoggedIn = req
            //     .get('Cookie')
            //     .split(';')[1]
            //     .trim()
            //     .spit('=')[1]

        // My cookie splitting imported from the util folder
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
        res.cookie('atest', 'true');
        res.cookie('aatesdt', 'true');
        res.cookie('tesdft', 'true');
        res.cookie('tesfdst', 'true');
        res.cookie('loggedIn', 'true');
        res.cookie('123123123123');
        res.cookie('tefdsafsdalkjst', '123123123132');
        res.cookie('fdsafdsafdsafdsa');
        res.redirect('/');
    }