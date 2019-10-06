// imports

    // core imports
        const fs = require('fs');
        const path = require('path');

    // local imports
        const rootDir = require('../util/rootDir');

// export models

    module.exports = class Product {
        constructor(t) {
            this.title = t;
        }

        save() {
            const productsPath = path.join(rootDir, 'data', 'products.json');
            fs.readFile(productsPath, (err, data) => {
                let products = [];
                if (!err) {
                    console.log(err);
                    products = JSON.parse(data);
                }
                products.push(this);
                fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            });
        }

        static fetchAll() {
            const productsPath = path.join(rootDir, 'data', 'products.json');
            fs.readFile(productsPath, (err, data) => {
                if (err) {
                    return [];
                }
                return JSON.parse(data);
            })
        }
    } 