// imports
    // core imports
        fs = require('fs');

    // local imports

        // models
            const Cart = require('../models/cart');


// helper functions

    // Returns if a value is really a number
    function isNumber (value) {
        return typeof value === 'number' && isFinite(value);
    }

// export controller functions

    exports.getCart = (req, res, next) => {
        Cart.fetchAll(cart => {
            res.render('shop/cart', {
                docTitle: 'Cart',
                path: '/cart',
                cart: cart
            });
        });

    }

    exports.postCartItem = (req, res ,next) => {
        const newCartItem = new Cart(
            JSON.parse(req.body.productToAdd),
            req.body.amount
        );
        
        Cart.fetchAll(oldCart => {
            let alreadyInCart = false;
            let cartIndex;
            let oldAmount;
            let newAmount;

            for (let i = 0; i < oldCart.length; i++) {
               if (JSON.stringify(oldCart[i].product) == JSON.stringify(newCartItem.product)) {
                   alreadyInCart = true;
                   cartIndex = i;
                   break;
               }
            };
            if (alreadyInCart == true) {
                oldAmount = parseInt(oldCart[cartIndex].amount);
                newAmount = oldAmount + 1;
                oldCart[cartIndex].amount = newAmount;
                Cart.overWrite(oldCart);

            } else {
                newCartItem.save();
            }
            res.redirect('/cart');
        });
    }

    exports.updateCartItemAmount = (req, res, next) => {
        Cart.fetchAll(currentCart => {
            console.log(req.body.setAmount, req.body.amountChange);
            const cartElement = JSON.parse(req.body.cartElement);
            const setAmount = parseInt(req.body.setAmount);
            const changeAmount = parseInt(req.body.amountChange); 
            let newAmount;



            if (typeof req.body.setAmount === 'undefined') {
                console.log('amount change is not undefined');
                if (parseInt(cartElement.amount) == 1 && changeAmount < 1) {
                } else if (parseInt(cartElement.amount) + changeAmount <= 0 ) {
                    console.log('new cart value is less than 1')
                } else {
                    console.log('inside else statement')
                    newAmount = parseInt(cartElement.amount) + changeAmount;
                    for (let i = 0; i < currentCart.length; i ++) {
                        if (JSON.stringify(cartElement.product) == JSON.stringify(currentCart[i].product)) {
                            currentCart[i].amount = newAmount;
                            Cart.overWrite(currentCart)
                            break;
                        }
                    }
                }

            } 

            if (typeof req.body.amountChange === 'undefined') {
                console.log('set change is not undefined');
                if (setAmount < 1) {
                    console.log('new amount is less than one');
                } else if (setAmount == null) {
                    console.log('changeamount is null');
                } else {
                    console.log('inside else statement', setAmount);
                    newAmount = setAmount;
                    for (let i = 0; i < currentCart.length; i ++) {
                        if (JSON.stringify(cartElement.product) == JSON.stringify(currentCart[i].product)) {
                            currentCart[i].amount = newAmount;
                            Cart.overWrite(currentCart)
                            break;
                        }
                    }
                }
            } 
            res.redirect('/cart');
        });
    }

    exports.removeCartItem = (req, res, next) => {
        Cart.fetchAll(currentCart => {
            const cartElement = JSON.parse(req.body.cartElement);
            let newCart;
            for (let i = 0; i < currentCart.length; i++) {
                if (JSON.stringify(cartElement.product) == JSON.stringify(currentCart[i].product)) {
                    newCart = currentCart;
                    newCart.splice(i, 1);
                    break;
                }
            }
            if (typeof newCart !== 'undefined') {
                Cart.overWrite(newCart);
            }
            res.redirect('/cart');
        });
    }