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

    exports.getProducts = (req, res, next) => {
        Product.fetchAll(products => {
            res.render('shop/product-list', {
                products: products,
                docTitle: 'All Products',
                path: "/products"
            });
        });
    }

    exports.getProduct = (req, res, next) => {
        const productId = req.params.productId;
        Product.findById(productId, product => {
            res.render('shop/product-detail', {
                product: product,
                docTitle: product.title,
                path: `/products` 
            });
        });

    }

    exports.getCart = (req, res, next) => {
        res.render('shop/cart', {
            docTitle: 'Cart',
            path: '/cart'
        });
    }

    exports.getOrders = (req, res, next) => {
        res.render('shop/orders', {
            docTitle: 'Orders',
            path: '/orders'
        });
    }

    exports.getCheckout = (req, res, next) => {
        res.render('shop/checkout', {
            docTitle: 'Checkout',
            path: '/checkout'
        });
    }