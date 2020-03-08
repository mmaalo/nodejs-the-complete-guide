// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended: true});
        const {check, body} = require('express-validator');

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
    router.post(
        '/add-product', 
        isAuth, 
        urlencodedParser, 
        [
            body('title', 'Please give the product a title between 5 and 80 characters')
            .isLength({min: 5, max: 80})
            .trim()
            .escape(),
            body('imageUrl', 'Please enter a valid URL')
            .isURL()
            .trim()
            .escape(),
            body('price', 'Enter a number with up to two decimal points')
            .isNumeric()
            .isDecimal({decimal_digits: '2', force_decimal: false})
            .escape(),
            body('description', 'Enter a description between 10 and 300 characters')
            .trim()
            .isLength({min: 10, max:300})
            .escape()
        ],
        adminController.postAddProduct);

    router.post(
        '/edit-product', 
        isAuth, 
        urlencodedParser, 
        [
            body('title', 'Please give the product a title between 5 and 80 characters')
            .isLength({min: 5, max: 80})
            .trim()
            .escape(),
            body('imageUrl', 'Please enter a valid URL')
            .isURL()
            .trim()
            .escape(),
            body('price', 'Enter a number with up to two decimal points')
            .isNumeric()
            .isDecimal({decimal_digits: '2', force_decimal: false})
            .escape(),
            body('description', 'Enter a description between 10 and 300 characters')
            .trim()
            .isLength({min: 10, max:300})
            .escape()
        ],
        adminController.postEditProduct);

    router.post('/delete-product', isAuth, urlencodedParser, adminController.postDeleteProduct);

// exports
    module.exports = router;