// imports

    // local imports

        // models
            const Cart = require('../models/cart');

// export controller functions

    exports.getCart = (req, res, next) => {
        Cart.fetchAll(cart => {
            res.render('shop/cart', {
                docTitle: 'Cart',
                path: '/cart',
                cart: cart
            });
        });

    }

    // exports.postCart = (req, res ,next) => {
        
    // }