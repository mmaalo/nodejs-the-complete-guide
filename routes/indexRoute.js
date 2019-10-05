// imports
    
    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router(); 
        const bodyParser = require('body-parser');
        const urlendcoded = bodyParser.urlencoded({extended: true});

    // local imports

const users = [];

// routes

router.get('/', (req, res, next) => {
    res.render('index', {
        docTitle: 'Home',
        path: '/'
    });
});

router.post('/', urlendcoded, (req, res, next) => {
    users.push(req.body);
    res.redirect('/users');
})

module.exports = {
    router: router,
    users: users
}