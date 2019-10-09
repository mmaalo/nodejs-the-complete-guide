// imports

    // core imports
        const fs = require('fs');
        const path = require('path');

    // local imports
        const rootDir = require('../util/rootDir');

// local variables

    const cartPath = path.join(rootDir, 'data', 'cart.json');

// export models

    module.exports = class CartItem {
        constructor(p, a) {
            this.product = p;
            this.amount = a
        }

        save() {
            let readCart;
            fs.readFile(cartPath, (err, data) => {
                if (err) {
                    readCart = [];
                } else {
                    readCart = JSON.parse(data);
                }
                readCart.push(this);
                fs.writeFile(cartPath, JSON.stringify(readCart), (err) => {
                    console.log(err);
                });
            });
        }

        static fetchAll(callback) {
            fs.readFile(cartPath, (err, data) => {
                if (err) {
                    callback([]);
                } else {
                    callback(JSON.parse(data));
                }
            });
        }
    }