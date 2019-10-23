// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();

    // local impoorts
        const shopController = require('../controllers/shop');

// routes
    router.get('/', shopController.getIndex);

    router.get('/products', shopController.getProducs);

    router.get('/cart', shopController.getCart);

    router.get('/checkout', shopController.getCheckout);

// exports
    module.exports = router;

