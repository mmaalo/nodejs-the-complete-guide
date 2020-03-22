// Imports

    // npm imports
        const {validationResult} = require('express-validator');
        const mongoose = require('mongoose');

    // Local imports
        const Product = require('../models/product');
        const flashMessage = require('../util/flashMessage');

// Error functions

    const errorfunction = (statuscode, err) => {
        const error = new Error(err);
        error.httpStatusCode = statuscode;
        return error;
    }

// Export controller functions
    exports.getAddProduct = (req, res, next) => {
        res.render('admin/edit-product', {
            docTitle: "Add Product",
            isAuthenticated: req.session.isLoggedIn,
            path: '/admin/add-product',
            inputValue: {
                title: '',
                imageUrl: '',
                price: '',
                description: ''
            },
            editing: false,
            hasErrors: false,
            validationErrors: [],
            errorMessage: null
        });
    }

    exports.postAddProduct = (req, res, next) => {
        const title = req.body.title;
        const imageUrl = req.body.imageUrl;
        const price = req.body.price;
        const description = req.body.description;
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('admin/edit-product', {
                isAuthenticated: req.session.isLoggedIn,
                docTitle: "Add Product",
                path: '/admin/add-product',
                product : { 
                    title: title, 
                    imageUrl: imageUrl, 
                    price: price, 
                    description: description 
                },
                editing: false,
                hasErrors: true,
                validationErrors: errors.array(),
                errorMessage: errors.array()[0].msg
            }) 
        }

        const product = new Product({
            _id: new mongoose.Types.ObjectId('5e64cfd6b6ee031934879a2a'),
            title: title, 
            price: price, 
            description: description, 
            imageUrl: imageUrl, 
            userId: req.session.user._id
        });
        product
            .save() // save() method is defined by mongoose
            .then(result => { // mongoose also gives us .then and .catch blocks that work similarly to a promise
                console.log('Created Product')
                res.redirect('/admin/products');
            })
            .catch(err => {
                // return res.status(500).render('admin/edit-product', {
                //     isAuthenticated: req.session.isLoggedIn,
                //     docTitle: "Add Product",
                //     path: '/admin/add-product',
                //     product : { 
                //         title: title, 
                //         imageUrl: imageUrl, 
                //         price: price, 
                //         description: description 
                //     },
                //     editing: false,
                //     hasErrors: true,
                //     validationErrors: [],
                //     errorMessage: 'database operation failed, try again later'
                // }) 

                // return res.status(500).redirect('/500');

                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            }); 
    }

    exports.getEditProduct = (req, res, next) => {
        const editMode = req.query.edit;
        console.log(editMode)
        if (!editMode) {
            return res.redirect('/');
        }
        const prodId = req.params.productId;
        if (!prodId) {
            return res.redirect('/');
        }
        Product.findById(prodId)
        .then(product => {
            throw new Error('dummy error');
            if (!product) {
                return res.redirect('/');
            }
            if(product.userId.toString() !== req.session.user._id.toString()) {
                req.flash('errorMessage', 'Cannot edit product crated by another user');
                return res.redirect('/admin/products');
            }
            res.render('admin/edit-product', {
                docTitle: "Edit Product",
                isAuthenticated: req.session.isLoggedIn,
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                errorMessage: null,
                hasErrors: false,
                validationErrors: []
            });
        })
        .catch(err => {
            return next(errorfunction(500, err))
        }); 
    }

    exports.postEditProduct = (req, res, next) => {
        const prodId = req.body.productId;
        const upTitle = req.body.title;
        const upPrice = req.body.price;
        const upImageUrl = req.body.imageUrl;
        const upDescription = req.body.description;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).render('admin/edit-product', {
                docTitle: "Edit Product",
                isAuthenticated: req.session.isLoggedIn,
                path: '/admin/edit-product',
                editing: true,
                hasErrors: true,
                product: {
                    _id: prodId,
                    title: upTitle,
                    price: upPrice,
                    imageUrl: upImageUrl,
                    description: upDescription
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            });
        }

        Product.findById(prodId)
        .then(product => {
            if(product.userId.toString() !== req.session.user._id.toString()) {
                return res.redirect('login');
            }
            product.title = upTitle;
            product.price = upPrice;
            product.description = upDescription;
            product.imageUrl = upImageUrl;
            return product.save()
                .then(() => {
                    res.redirect('/admin/products');
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }

    exports.postDeleteProduct = (req, res, next) => {
        const prodId = req.body.productId;
        Product.findOne({_id: prodId, userId: req.session.user._id})
        .then(product => {
            if(product == null) {
                req.flash('errorMessage', 'Cannot delete product crated by another user');
                return res.redirect('/admin/products');
            }
            Product.deleteOne({_id: prodId, userId: req.session.user._id})
            .then(() => {
                res.redirect('/admin/products');
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    }



    exports.getProducts = (req, res, next) => {
        Product.find()
        .then(products => {
            res.render('admin/products', {
                products: products,
                docTitle: 'Admin Products',
                isAuthenticated: req.session.isLoggedIn,
                path: "/admin/products",
                errorMessage: flashMessage(req.flash('errorMessage')),
                hasErrors: false
            });
        })
        .catch(err => console.log(err));
    }
