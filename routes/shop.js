// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended:true});

    // local impoorts
        const shopController = require('../controllers/shop');

// routes
    router.get('/', shopController.getIndex);

    router.get('/products', shopController.getProducts);
    
    router.get('/products/:productId', shopController.getProduct);

    // router.get('/cart', shopController.getCart);

    // router.post('/cart', urlencodedParser, shopController.postCart);

    // router.post('/cart-delete-item', urlencodedParser, shopController.postCartDeleteProduct);
    
    // router.post('/create-order', shopController.postOrder);

    // router.get('/orders', shopController.getOrders);

// exports
    module.exports = router;

