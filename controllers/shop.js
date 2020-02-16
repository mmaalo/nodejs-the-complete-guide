// imports

    // local imports

        // models
            const Product = require('../models/product');
            const Order = require('../models/order');
            const User = require('../models/user');

// export controller functions

    exports.getIndex = (req, res, next) => {
        Product.find()
        .then(products => {
            res.render('shop/index', {
                products: products,
                docTitle: 'Shop',
                isAuthenticated: req.session.isLoggedIn,
                path: "/",
                csrfToken: req.csrfToken()
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
                isAuthenticated: req.session.isLoggedIn,
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
                isAuthenticated: req.session.isLoggedIn,
                path: `/products` 
            });
        })
        .catch(err => console.log(err));
    }

    exports.getCart = (req, res, next) => {
        req.session.user = new User().init(req.session.user);
        req.session.user
        .populate('cart.items.productId')
        .execPopulate() // This is needed for populate to return a promise
        .then(user => {
            res.render('shop/cart', {
                path: '/cart',
                docTitle: 'Your Cart',
                isAuthenticated: req.session.isLoggedIn,
                products: user.cart.items
            });
        })
        .catch(err => console.log(err));
    }

    exports.postCart = (req, res, next) => {
        const prodId = req.body.productId;
        Product.findById(prodId)
            .then(product => {
                req.session.user = new User().init(req.session.user);
                return req.session.user.addToCart(product);
            })
            .then(result => {
                console.log(result);
                res.redirect('/cart');
            })
    }

    exports.postCartDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId;
        req.session.user = new User().init(req.session.user);
        req.session.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    }

    exports.postOrder = (req, res, next) => { 
        req.session.user = new User().init(req.session.user);
        req.session.user
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
                    name: req.session.user.name,
                    userId: req.session.user
                },
                products: products
            });
            order.save();
        })
        .then(() => {
            return req.session.user.clearCart();
        })
        .then(() => {
            res.redirect('orders');
        })
        .catch(err => console.log(err)); 
    }


    exports.getOrders = (req, res, next) => {
        req.session.user = new User().init(req.session.user);
        Order.find({ "user.userId": req.session.user._id })
        .then(orders => {
            res.render('shop/orders', {
                docTitle: 'Orders',
                isAuthenticated: req.session.isLoggedIn,
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
    }
