// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended: true});

    // local impoorts
        const adminController = require('../controllers/admin');
        const isAuth = require('../middleware/is-auth');

// routes

    // // /admin/add-product --> GET
    router.get('/add-product', isAuth, adminController.getAddProduct);

    router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

    // // /admin/products --> GET
    router.get('/products', isAuth, adminController.getProducts);

    // // /admin/add-product --> POST 
    router.post('/add-product', isAuth, urlencodedParser, adminController.postAddProduct);

    router.post('/edit-product', isAuth, urlencodedParser, adminController.postEditProduct);

    router.post('/delete-product', isAuth, urlencodedParser, adminController.postDeleteProduct);

// exports
    module.exports = router;