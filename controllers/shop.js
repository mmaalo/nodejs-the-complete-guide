// imports

    // local imports

        // models
            const Product = require('../models/product');

// export controller functions

    exports.getIndex = (req, res, next) => {
        Product.fetchAll()
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
        Product.fetchAll()
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
        const productId = req.params.productId;
        console.log('product id: ', productId);
        Product.findById(productId)
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
        req.user.getCart()
        .then(products => {
                res.render('shop/cart', {
                    path: '/cart',
                    docTitle: 'Your Cart',
                    products: products
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
        req.user.deleteItemFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
    }

    exports.postOrder = (req, res, next) => {
        let fetchedCart = cart;
        req.user.getCart()
        .then(cart => {
            return cart.getProducts();
        })
        .then(products => {
            req.user.createOrder()
            .then(order => {
                return order.addProducts(products.map(product => {
                    product.orderItem = { quantity: product.cartItem.quantity };
                    return product
                }));
            })
            .catch(err => console.log(err));
        })
        .then(result => {
            fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err)); 
    }

    exports.getOrders = (req, res, next) => {
        req.user.getOrders({include: ['products']})
        .then(orders => {
            res.render('shop/orders', {
                docTitle: 'Orders',
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
    }

    exports.getCheckout = (req, res, next) => {
        res.render('shop/checkout', {
            docTitle: 'Checkout',
            path: '/checkout'
        });
    }