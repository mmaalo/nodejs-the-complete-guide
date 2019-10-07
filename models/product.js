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

// export models}

    module.exports = class Product {
        constructor(t, iL, iA, p, d) {
            this.title = t;

            if (iL == '') {
                this.imageLink = 'https://www.chillinoodle.co.uk/skin/frontend/chillinoodle/default/images/catalog/product/placeholder/image.jpg';
            } else {
                this.imageLink = iL
            }

            if (iA == '') {
                this.imageAlt = 'product image'
            } else {
                this.imageAlt = iA;
            }

            this.price = p;
            this.description = d;
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