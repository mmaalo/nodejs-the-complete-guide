// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();

    // local impoorts
        const productsController = require('../controllers/products');

// routes
    router.get('/', productsController.getProducs);

// exports
    module.exports = router;

