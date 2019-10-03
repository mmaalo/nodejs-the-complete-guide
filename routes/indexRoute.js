const path = require('path');
const fs = require('fs');

const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:true});

const rootDir = require('../util/path');

// / --> Get
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'index.html'));
});

// /users -- Post
router.post('/', urlencodedParser, (req, res, next) => {
    const userNameString = `<li>${req.body.userName}</li>
`; 
    if (fs.existsSync(path.join(rootDir, 'userdata.txt'))) {
        const oldData = fs.readFileSync(path.join(rootDir, 'userdata.txt'));
        const newData = oldData + userNameString;
        fs.writeFileSync(path.join(rootDir, 'userdata.txt'), newData);
    } else {
        fs.writeFileSync(path.join(rootDir, 'userdata.txt'), userNameString);
    }
    console.log(req.body);
    res.redirect('/users');
});


module.exports = router;