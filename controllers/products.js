// imports

    // local imports

        // models
            const Product = require('../models/product');

// export controller functions

    exports.getAddProduct = (req, res, next) => {
        res.render('admin/add-product', {
            docTitle: "Add Product",
            path: '/admin/add-product'
        });
    }

    exports.postAddProduct = (req, res, next) => {
        const product = new Product(
            req.body.title,
            req.body.imageLink,
            req.body.imageAlt,
            req.body.price,
            req.body.description
        );
        product.save();
        res.redirect('/');
    }

    exports.getProducs = (req, res, next) => {
        // by passing products as a callback inside fetchAll() we avoid prods being undefined at load time. This is because out file is done being read before shop.ejs is rendered. See the controller static fetchAll() method for how this works.
        Product.fetchAll(products => {
            res.render('shop/product-list', {
                prods: products,
                docTitle: 'Shop',
                path: "/"
            });
        });
    }

    exports.getProductDetail = (req, res, next) => {
        console.log(req.body);
        console.log('yes');
        res.send('yo momma')
    }