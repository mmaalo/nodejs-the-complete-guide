// Imports

    // npm imports
        const {validationResult} = require('express-validator');
        const mongoose = require('mongoose');

    // Local imports
        const Product = require('../models/product');
        const flashMessage = require('../util/flashMessage');
        const errorfunction = require('../util/errorfunction');

// Export controller functions
    exports.getAddProduct = (req, res, next) => {
        res.render('admin/edit-product', {
            docTitle: "Add Product",
            isAuthenticated: req.session.isLoggedIn,
            path: '/admin/add-product',
            inputValue: {
                title: '',
                image: '',
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
        const image = req.file;
        const price = req.body.price;
        const description = req.body.description;
        
        const errors = validationResult(req);

        if (!image) {
            return res.status(422).render('admin/edit-product', {
                isAuthenticated: req.session.isLoggedIn,
                docTitle: "Add Product",
                path: '/admin/add-product',
                product : { 
                    title: title, 
                    price: price, 
                    description: description 
                },
                editing: false,
                hasErrors: true,
                validationErrors: 'file must be a valid image file',
                errorMessage: []
            }) 
        }

        if (!errors.isEmpty()) {
            return res.status(422).render('admin/edit-product', {
                isAuthenticated: req.session.isLoggedIn,
                docTitle: "Add Product",
                path: '/admin/add-product',
                product : { 
                    title: title, 
                    price: price, 
                    description: description 
                },
                editing: false,
                hasErrors: true,
                validationErrors: errors.array(),
                errorMessage: errors.array()[0].msg
            });
        }

        const imageUrl = image.path;

        const product = new Product({
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
                return next(errorfunction(500, err));
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
            // throw new Error('dummy error');
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
            return next(errorfunction(500, err));
        }); 
    }

    exports.postEditProduct = (req, res, next) => {
        const prodId = req.body.productId;
        const upTitle = req.body.title;
        const upPrice = req.body.price;
        const image = req.file;
        const upDescription = req.body.description;

        const errors = validationResult(req);

        console.log(errors);
        console.log(image);
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
                    description: upDescription
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            });
        }

        Product.findById(prodId)
        .then(product => {
            console.log(product);
            if(product.userId.toString() !== req.session.user._id.toString()) {
                return res.redirect('login');
            }
            product.title = upTitle;
            product.price = upPrice;
            product.description = upDescription;
            if (image) {
                product.imageUrl = image.path;
            }
            return product.save()
                .then(() => {
                    res.redirect('/admin/products');
                })
                .catch(err => {
                    return next(errorfunction(500, err));
                });
        })
        .catch(err => {
            return next(errorfunction(500, err));
        });
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
            .catch(err => {
                return next(errorfunction(500, err));
            });
        })
        .catch(err => {
            return next(errorfunction(500, err));
        });
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
        .catch(err => {
            return next(errorfunction(500, err));
        });
    }
