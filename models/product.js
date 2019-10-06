// imports

    // core imports
        const fs = require('fs');
        const path = require('path');

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
        constructor(t) {
            this.title = t;
        }

        save() {
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
    } 