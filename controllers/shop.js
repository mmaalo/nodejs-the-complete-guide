// imports

    // local imports

        // models
            const Product = require('../models/product');
            const Order = require('../models/order');

// export controller functions

    exports.getIndex = (req, res, next) => {
        Product.find()
        .then(products => {
            res.render('shop/index', {
                products: products,
                docTitle: 'Shop',
                path: "/"
            });
        })
        .catch(err => console.log(err));
    }

    exports.getProducts = (req, res, next) => {
        Product.find()
        .then(products => {
            res.render('shop/product-list', {
                products: products,
                docTitle: 'All Products',
                path: "/products"
            });
        })
        .catch(err => console.log(err));
    }

    exports.getProduct = (req, res, next) => {
        const prodId = req.params.productId;
        Product.findById(prodId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                docTitle: product.title,
                path: `/products` 
            });
        })
        .catch(err => console.log(err));
    }

    exports.getCart = (req, res, next) => {
        req.user
        .populate('cart.items.productId')
        .execPopulate() // This is needed for populate to return a promise
        .then(user => {
            res.render('shop/cart', {
                path: '/cart',
                docTitle: 'Your Cart',
                products: user.cart.items
            });
        })
        .catch(err => console.log(err));
    }

    exports.postCart = (req, res, next) => {
        const prodId = req.body.productId;
        Product.findById(prodId)
            .then(product => {
                return req.user.addToCart(product);
            })
            .then(result => {
                console.log(result);
                res.redirect('/cart');
            })
    }

    exports.postCartDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId;
        req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    }

    exports.postOrder = (req, res, next) => { 
        req.user
        .populate('cart.items.productId')
        .execPopulate() // This is needed for populate to return a promise
        .then(user => {
            const products = user.cart.items.map(i => {
                return {
                    quantity: i.quantity, 
                    product: {...i.productId._doc}
                }
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                products: products
            });
            order.save();
        })
        .then(() => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('orders');
        })
        .catch(err => console.log(err)); 
    }


    exports.getOrders = (req, res, next) => {
        req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders', {
                docTitle: 'Orders',
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
    }