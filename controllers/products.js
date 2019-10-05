// store products in array
const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        docTitle: "Add Product",
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
    products.push({title: req.body.title})
    res.redirect('/');
}

exports.getProducs = (req, res, next) => {
    res.render('shop', {
        prods: products,
        docTitle: 'Shop',
        path: "/"
    });
}