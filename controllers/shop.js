// imports

    // local imports

        // models
            const Product = require('../models/product');

// export controller functions

    exports.getIndex = (req, res, next) => {
        Product.fetchAll(products => {
            res.render('shop/index', {
                products: products,
                docTitle: 'Shop',
                path: "/"
            });
        });
    }

    exports.getProducs = (req, res, next) => {
        Product.fetchAll(products => {
            res.render('shop/product-list', {
                products: products,
                docTitle: 'All Products',
                path: "/products"
            });
        });
    }

    exports.getCart = (req, res, next) => {
        res.render('shop/cart', {
            docTitle: 'Cart',
            path: '/cart'
        });
    }

    exports.getCheckout = (req, res, next) => {
        res.render('shop/checkout', {
            docTitle: 'Checkout',
            path: '/checkout'
        })
    }