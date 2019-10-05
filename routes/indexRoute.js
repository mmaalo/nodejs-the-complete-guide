// imports
    
    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlendcoded = bodyParser.urlencoded({extended: true});

    // local imports

// variables
const users = [];
const exists = [];

// routes

router.get('/', (req, res, next) => {
    res.render('index', {
        docTitle: 'Home',
        indexCSS: true,
        activeHome: true
    });
});

router.post('/', urlendcoded, (req, res, next) => {
    let userExists = false;

    if (exists.length > 0) {
        for (let element of exists) {
            exists.pop();
        }
    }

    if (users.length > 0) {
        for (let element of users) {
            if (element.userName == req.body.userName) {
                userExists = true;
            }
        }
        if (userExists == false) {
            users.push(req.body);
            exists.push('false');
        } else {
            exists.push('true');
        }

    } else {
        users.push(req.body)
        exists.push('false')
    }
    res.redirect('/users');
})

module.exports = {
    router,
    users,
    exists
}