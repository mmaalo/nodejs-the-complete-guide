// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();

    // local impoorts
        const productsController = require('../controllers/products');
        const cartController = require('../controllers/cart');

// routes
    router.get('/', productsController.getProducs);
    router.get('/cart', cartController.getCart);

// exports
    module.exports = router;

