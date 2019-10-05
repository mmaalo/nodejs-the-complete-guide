// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended: true});

    // local impoorts
        const productsController = require('../controllers/products');

// routes

    // /admin/add-product --> GET
    router.get('/add-product', productsController.getAddProduct);

    // /admin/add-product --> POST 
    router.post('/add-product', urlencodedParser, productsController.postAddProduct);

// exports
    module.exports = router;