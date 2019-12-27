// imports

    // local imports

        // models
            const Product = require('../models/product');
            const Cart = require('../models/cart');

// export controller functions

    exports.getIndex = (req, res, next) => {
        Product.findAll()
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
        Product.findAll()
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
        Product.findByPk(productId)
        .then(product => {
            res.render('shop/product-detail', {
                product: product,
                docTitle: product.title,
                path: `/products` 
            });
        })
        .catch(err => console.log(err));

        // Product.findAll({where: {id: productId} })
        // .then(products => {
        //     console.log(products)
        //     res.render('shop/product-detail', {
        //         product: products[0],
        //         docTitle: products[0].title,
        //         path: `/products` 
        //     });
        // })
        // .catch(err => console.log(err));
    }

    exports.getCart = (req, res, next) => {
        Cart.getCart(cart => {
            Product.fetchAll(products => {
                const cartProducts = [];
                if (cart.length > 0) {
                    for (product of products) {
                        const cartProductData = cart.products.find(prod => prod.id === product.id);
                        if (cartProductData) {
                            cartProducts.push({productData: product, qty: cartProductData.qty});
                        }
                    }
                }
                res.render('shop/cart', {
                    docTitle: 'Cart',
                    path: '/cart',
                    products: cartProducts
                });
            });
        });
    }

    exports.postCart = (req, res, next) => {
        const prodId = req.body.productId;
        Product.findById(prodId, (product) => {
            Cart.addProduct(prodId, product.price);
        });
        console.log(prodId);
        res.redirect('/cart');
    }

    exports.postCartDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId;
        Product.findById(prodId, product => {
            Cart.deleteProduct(prodId, product.price);
            res.redirect('/cart');
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