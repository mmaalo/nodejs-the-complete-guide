// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();

    // local impoorts
        const shopController = require('../controllers/shop');

// routes
    router.get('/', shopController.getIndex);

    router.get('/products', shopController.getProducts);
    
    router.get('/products/:productId', shopController.getProduct);

    router.get('/cart', shopController.getCart);

    router.get('/orders', shopController.getOrders);

    router.get('/checkout', shopController.getCheckout);

// exports
    module.exports = router;

