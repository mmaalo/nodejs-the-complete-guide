// imports
    
    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router(); 
        const bodyParser = require('body-parser');
        const urlendcoded = bodyParser.urlencoded({extended: true});

    // local imports

const users = [];
const exists = [];

// routes

router.get('/', (req, res, next) => {
    res.render('index', {
        docTitle: 'Home',
        path: '/'
    });
});

router.post('/', urlendcoded, (req, res, next) => {
    if (users.length > 0) {
        for (let user of users) {
            if (user.userName === req.body.userName) {
                exists.push('true');
                exists.shift();
            } else {
                exists.push('false');
                exists.shift();
            }
        }
    } else {
        exists.push('false')
    }

    if (exists.slice(-1)[0] == 'false') {
        users.push(req.body);
    }

    res.redirect('/users');
});

module.exports = {
    router: router,
    users: users,
    exists: exists
}