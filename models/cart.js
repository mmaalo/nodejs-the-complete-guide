// imports

    // core imports
    const fs = require('fs');
    const path = require('path');

// npm imports
    const uniqid = require('uniqid');

// local imports
    const rootDir = require('../util/rootDir');

    // local variables
    const cartPath = path.join(rootDir, 'data', 'cart.json');


// export cart model
module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(cartPath, (err, data) => {
            let cart = {products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(data);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.find(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // Add new product / increase amount
            if (existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.prod = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + Number(productPrice);
            fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
        
    }

}
