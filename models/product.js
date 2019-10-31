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
        constructor(title, imageUrl, price, description) {
            this.title = title;
            this.imageUrl = imageUrl;
            this.price = price;
            this.description = description;

        }

        save() {
            this.id = uniqid('product-');
            getProductsFromFile(products => {
                products.push(this);
                fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
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