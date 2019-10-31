// imports

    // core imports
        const fs = require('fs');
        const path = require('path');

    // npm imports
        const uniqid = require('uniqid');

    // local imports
        const rootDir = require('../util/rootDir');
       
// local variables

    const productsPath = path.join(rootDir, 'data', 'products.json');

// functions

    const getProductsFromFile = (callback) => {
            fs.readFile(productsPath, (err, data) => {
                if (err) {
                    callback([])
                } else {
                    callback(JSON.parse(data));
                }
            });
    }

// export models

    module.exports = class Product {
        constructor(id, title, imageUrl, price, description) {
            this.id = id;
            this.title = title;
            this.imageUrl = imageUrl;
            this.price = price;
            this.description = description;

        }

        save() {
            getProductsFromFile(products => {
                if (this.id) {
                    const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                    const updatedProducts = [...products];
                    updatedProducts[existingProductIndex] = this;
                    fs.writeFile(productsPath, JSON.stringify(updatedProducts), (err) => {
                        console.log(err);
                    });
                } else {
                    this.id = uniqid('product-');
                    products.push(this);
                    fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                        console.log(err);
                    });
                }
            });
        }

        static fetchAll(callback) {
            getProductsFromFile(callback);
        }

        static findById(id, callback) {
            getProductsFromFile(products => {
                // const product = products.find((p) => {
                //     if (p.id === id) {
                //         return p;
                //     }
                // });
                const product = products.find(p => p.id === id);
                callback(product);
            });
        }
    } 