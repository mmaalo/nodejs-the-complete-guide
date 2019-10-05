// imports
    
    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router(); 
        const bodyParser = require('body-parser');
        const urlendcoded = bodyParser.urlencoded({extended: true});

    // local imports

// variables
const userNames = [];
const exists = [];

// routes

router.get('/', (req, res, next) => {
    res.render('index', {
        docTitle: 'Home'
    });
});

router.post('/', urlendcoded, (req, res, next) => {

    let userExists = false;

    if (userNames.length > 0) {
        for (let element of userNames) {
            if (req.body.userName == element.userName) {
                userExists = true;
            }
        }
    }

    if (exists.length > 0) {
        for (let element of exists) {
            exists.pop();
        }
    }

    if (userExists == false) {
        exists.push('false');
        userNames.push(req.body);
        res.redirect('/users');
    } else {
        exists.push('true')
        res.redirect('/users');
    }

});

module.exports = {
    route: router,
    users: userNames,
    exists: exists
}