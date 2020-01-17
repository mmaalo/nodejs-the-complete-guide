// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended: true});

    // local impoorts
        const adminController = require('../controllers/admin');

// routes

    // /admin/add-product --> GET
    router.get('/add-product', adminController.getAddProduct);

    router.get('/edit-product/:productId', adminController.getEditProduct);

    // /admin/products --> GET
    router.get('/products', adminController.getProducts);

    // /admin/add-product --> POST 
    router.post('/add-product', urlencodedParser, adminController.postAddProduct);

    router.post('/edit-product', urlencodedParser, adminController.postEditProduct);

    router.post('/delete-product', urlencodedParser, adminController.postDeleteProduct);

// exports
    module.exports = router;