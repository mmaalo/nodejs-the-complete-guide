const path = require('path');

const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

const rootDir = require('../util/path'); 

// store products in array
const products = [];

// /admin/add-product --> GET
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product');
});

// /admin/add-product --> POST 
router.post('/add-product', urlencodedParser, (req, res, next) => {
    products.push({title: req.body.title})
    res.redirect('/');
});

exports.routes = router;
exports.products = products;