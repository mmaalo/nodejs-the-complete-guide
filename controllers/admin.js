// Imports

    // Local imports
        const Product = require('../models/product');

// Export controller functions
    exports.getAddProduct = (req, res, next) => {
        res.render('admin/add-product', {
            docTitle: "Add Product",
            path: '/admin/add-product'
        });
    }

    exports.postAddProduct = (req, res, next) => {
        const product = new Product(req.body.title);
        product.save();
        res.redirect('/');
    }

    exports.getProducts = (req, res, next) => {
        Product.fetchAll(products => {
            res.render('admin/products', {
                products: products,
                docTitle: 'Admin Products',
                path: "/admin/products"
            });
        });
    }
