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
        req.user
            .createProduct({ // Creates a new product trough sequelize. Sequelize creates the createProduct() method because we connected the Product table to the User table
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            })
            .then(result => {
                console.log('Created Product')
                res.redirect('/admin/products');
            })
            .catch(err => {
                console.log(err);
            }); 
    }

    // exports.getEditProduct = (req, res, next) => {
    //     const editMode = req.query.edit;
    //     if (!editMode) {
    //         return res.redirect('/');
    //     }
    //     const prodId = req.params.productId;
    //     if (!prodId) {
    //         return res.redirect('/');
    //     }
    //     req.user.getProducts({ where: { id: prodId } }) // Uses sequelize to get products created by the logged in user
    //     // Product.findByPk(prodId)
    //     // .then(product => {
    //     .then(products => {
    //         const product = products[0];
    //         if (!product) {
    //             return res.redirect('/');
    //         }
    //         res.render('admin/edit-product', {
    //             docTitle: "Edit Product",
    //             path: '/admin/edit-product',
    //             editing: editMode,
    //             product: product
    //         });
    //     })
    //     .catch(err => console.log(err));
    // }

    // exports.postEditProduct = (req, res, next) => {
    //     const prodId = req.body.productId;
    //     const upTitle = req.body.title;
    //     const upPrice = req.body.price;
    //     const upImageUrl = req.body.imageUrl;
    //     const upDescription = req.body.description;

    //     Product.findByPk(prodId)
    //     .then(product => {
    //         product.title = upTitle;
    //         product.price = upPrice;
    //         product.imageUrl = upImageUrl;
    //         product.description = upDescription;
    //         return product.save()
    //     })
    //     .then(result => {
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));
    // }

    // exports.postDeleteProduct = (req, res, next) => {
    //     const productToDelete = req.body.productId;
    //     Product.findByPk(productToDelete)
    //     .then(product => {
    //         return product.destroy();
    //     })
    //     .then(result => {
    //         res.redirect('/admin/products');
    //     })
    //     .catch(err => console.log(err));
    // }



    // exports.getProducts = (req, res, next) => {
    //     req.user.getProducts()
    //     // Product.findAll()
    //     .then(products => {
    //         res.render('admin/products', {
    //             products: products,
    //             docTitle: 'Admin Products',
    //             path: "/admin/products"
    //         });
    //     })
    //     .catch(err => console.log(err));
    // }
