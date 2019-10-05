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
let  userExist = false;

// routes

router.get('/', (req, res, next) => {
    res.render('index', {
        docTitle: 'Home'
    });
});

router.post('/', urlendcoded, (req, res, next) => {
    if (userNames.length === 0) {
        userNames.push(req.body);
        userExist = true;
    }
    if (userNames.length > 0) {
        userExist = false;
        for (let i = 0; i < userNames.length; i++) {
            const requestBodyName = req.body.userName;
            if (userNames[i].userName === requestBodyName) {
                userExist = true;
            } 
        }
        if (userExist == false) {
            userNames.push(req.body);
        }
        res.redirect('/users');
    }
})

module.exports = {
    route: router,
    users: userNames
}