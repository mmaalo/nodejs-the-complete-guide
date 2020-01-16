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
            console.log('logging product: ', product)
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
        .then(cart => {
            return cart.getProducts()
            .then(products => {
                res.render('shop/cart', {
                    path: '/cart',
                    docTitle: 'Your Cart',
                    products: products
                })
            }).catch(err => console.log(err));
        })
        .catch(err => console.log(err));
        // Cart.getCart(cart => {
        //     Product.fetchAll(products => {
        //         const cartProducts = [];
        //         if (cart.length > 0) {
        //             for (product of products) {
        //                 const cartProductData = cart.products.find(prod => prod.id === product.id);
        //                 if (cartProductData) {
        //                     cartProducts.push({productData: product, qty: cartProductData.qty});
        //                 }
        //             }
        //         }
        //         res.render('shop/cart', {
        //             docTitle: 'Cart',
        //             path: '/cart',
        //             products: cartProducts
        //         });
        //     });
        // });
    }

    exports.postCart = (req, res, next) => {
        const prodId = req.body.productId;
        let fetchedCart;
        let newQuantity = 1;
        req.user
            .getCart()
            .then(cart => {
                fetchedCart = cart;
                return cart.getProducts({ where: { id: prodId } });
            })
            .then(products => {
                let product;
                if (products.length > 0) {
                    product = products[0];
                }
      
                if (product) {
                    const oldQuantity = product.cartItem.quantity;
                    newQuantity = oldQuantity + 1;
                    return product;
                }
                return Product.findByPk(prodId);
            })
            .then(product => {
                return fetchedCart.addProduct(product, {
                    through: { quantity: newQuantity }
                });
            })
            .then(() => {
                res.redirect('/cart');
            })
            .catch(err => console.log(err));
    }

    exports.postCartDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId;
        req.user.getCart()
        .then(cart=> {
            return cart.getProducts({ where: {id: prodId}});
        })
        .then(products => {
            const product = products[0];
            return product.cartItem.destroy();
        })
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
            console.log(products);
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