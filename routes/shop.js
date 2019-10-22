// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended: true});

    // local impoorts
        const productsController = require('../controllers/products');
        const cartController = require('../controllers/cart');

// routes
    router.get('/', productsController.getProducs);
    router.get('/product-detail', urlencodedParser, productsController.getProductDetail);
    router.get('/cart', cartController.getCart);
    router.post('/add-to-cart', urlencodedParser, cartController.postCartItem);
    router.post('/update-cart-item-amount', urlencodedParser, cartController.updateCartItemAmount);
    router.post('/remove-cart-item', urlencodedParser, cartController.removeCartItem);

// exports
    module.exports = router;

