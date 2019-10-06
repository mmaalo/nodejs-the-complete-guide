// imports

    // local imports

        // models
            const Product = require('../models/product');

// export controller functions

    exports.getAddProduct = (req, res, next) => {
        res.render('add-product', {
            docTitle: "Add Product",
            path: '/admin/add-product'
        });
    }

    exports.postAddProduct = (req, res, next) => {
        const product = new Product(req.body.title);
        product.save();
        res.redirect('/');
    }

    exports.getProducs = (req, res, next) => {
        const products = [];
        console.log(Product.fetchAll());
        res.render('shop', {
            prods: products,
            docTitle: 'Shop',
            path: "/"
        });
    }