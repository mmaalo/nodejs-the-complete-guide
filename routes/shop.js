const path = require('path');

const express = require('express');

const router = express.Router();

const adminData = require('./admin');

const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
    console.log(adminData.products);
    const products = adminData.products;
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    res.render('shop', {
        prods: products,
        docTitle: 'Shop',
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
    });
});

module.exports = router;
