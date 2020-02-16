// imports

    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router();
        const bodyParser = require('body-parser');
        const urlencodedParser = bodyParser.urlencoded({extended:true});

    // local impoorts
        const shopController = require('../controllers/shop');
        const isAuth = require('../middleware/is-auth');

// routes
    router.get('/', shopController.getIndex);

    router.get('/products', shopController.getProducts);
    
    router.get('/products/:productId', shopController.getProduct);

    router.get('/cart', isAuth, shopController.getCart);

    router.post('/cart', isAuth, urlencodedParser, shopController.postCart);

    router.post('/cart-delete-item', isAuth, urlencodedParser, shopController.postCartDeleteProduct);
    
    router.post('/create-order', isAuth, shopController.postOrder);

    router.get('/orders', isAuth, shopController.getOrders);


// exports
    module.exports = router;

