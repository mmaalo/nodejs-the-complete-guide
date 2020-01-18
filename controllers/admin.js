// Imports

    // Local imports
        const Product = require('../models/product');

// Export controller functions
    exports.getAddProduct = (req, res, next) => {
        res.render('admin/edit-product', {
            docTitle: "Add Product",
            path: '/admin/add-product',
            editing: false
        });
    }

    exports.postAddProduct = (req, res, next) => {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        const product = new Product({
            title: title, 
            price: price, 
            description: description, 
            imageUrl: imageUrl, 
            userId: req.user._id
        });
        product
            .save() // save() method is defined by mongoose
            .then(result => { // mongoose also gives us .then and .catch blocks that work similarly to a promise
                console.log('Created Product')
                res.redirect('/admin/products');
            })
            .catch(err => {
                console.log(err);
            }); 
    }

    exports.getEditProduct = (req, res, next) => {
        const editMode = req.query.edit;
        if (!editMode) {
            return res.redirect('/');
        }
        const prodId = req.params.productId;
        if (!prodId) {
            return res.redirect('/');
        }
        Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', {
                docTitle: "Edit Product",
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err));
    }

    exports.postEditProduct = (req, res, next) => {
        const prodId = req.body.productId;
        const upTitle = req.body.title;
        const upPrice = req.body.price;
        const upImageUrl = req.body.imageUrl;
        const upDescription = req.body.description;

        Product.findById(prodId)
        .then(product => {
            product.title = upTitle;
            product.price = upPrice;
            product.description = upDescription;
            product.imageUrl = upImageUrl;
            return product.save()
        })
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    }

    exports.postDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId;
        Product.findByIdAndDelete(prodId)
        .then(result => {
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));
    }



    exports.getProducts = (req, res, next) => {
        Product.find()
        .then(products => {
            res.render('admin/products', {
                products: products,
                docTitle: 'Admin Products',
                path: "/admin/products"
            });
        })
        .catch(err => console.log(err));
    }
