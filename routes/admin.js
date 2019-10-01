const path = require('path');

const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

// /admin/add-product --> GET
router.get('/add-product', (req, res, next) => {
    console.log(`I'm the add-product middleware`);
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

// /admin/add-product --> POST 
router.post('/add-product', urlencodedParser, (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;