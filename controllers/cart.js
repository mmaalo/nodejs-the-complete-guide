// imports

    // local imports

        // models
            const Cart = require('../models/cart');


// helper functions

    // Returns if a value is really a number
    function isNumber (value) {
        return typeof value === 'number' && isFinite(value);
    }

    // Checks if a cartItem matches any in the cart. Returns a callback with the index of the first item that matches in the cart. If there is no match 'undefined' will be returned in the callback. 
    function matchCartAction(cart, cartItem, callback) {
        let match;
        for (let i = 0; i < cart.length; i++) {
            if (JSON.stringify(cart[i].product) == JSON.stringify(cartItem.product)) {
                match = i;
                break;
            }
        }
        callback(match);
    }

// export controller functions

    
    exports.getCart = (req, res, next) => {
        // // Get all cart items and pass the cart to the view, then render the '/cart' page
        Cart.fetchAll(cart => {
            res.render('shop/cart', {
                docTitle: 'Cart',
                path: '/cart',
                cart: cart
            });
        });
    }

    
    exports.postCartItem = (req, res ,next) => {

        // Create a new cart item with the values passed from the view
        const newCartItem = new Cart(
            JSON.parse(req.body.productToAdd),
            req.body.amount
        );
        
        // Get all cart items and store them in 'currentCart'
        Cart.fetchAll(currentCart => {
            // Check if the new cart item already is in the cart. If it is increase that cart items amount by one.
            matchCartAction(currentCart, newCartItem, index => {
                // If index is a number the new cart item is already in the cart.
                if (isNumber(index)) {
                    const oldAmount = parseInt(currentCart[index].amount);
                    const newAmount = oldAmount + 1;
                    currentCart[index].amount = newAmount;
                    Cart.overWrite(currentCart);
                } else {
                    newCartItem.save();
                }
            });
            res.redirect('/cart');
        });
    }

    exports.updateCartItemAmount = (req, res, next) => {
        // Get all cart items and store them in 'currentCart'
        Cart.fetchAll(currentCart => {
            // Get the cart element witch we will the amount on
            const cartElement = JSON.parse(req.body.cartElement);
            // Get the setAmount or changeAmount values from the view. One of them will be undefined, depending on witch was passed by the view.
            const setAmount = parseInt(req.body.setAmount);
            const changeAmount = parseInt(req.body.changeAmount);
            let newAmount;

            // Check witch of the setAmount and changeAmount variables that are not undefined and make sure that it is a number. Then calculate the new amount for the cart item
            if (isNumber(setAmount) && !isNumber(changeAmount)) {
                if (setAmount > 0) {
                    newAmount = setAmount;
                }
            }

            if (isNumber(changeAmount) && !isNumber(setAmount)) {
                if (
                    isNumber(parseInt(cartElement.amount)) &&
                    (parseInt(cartElement.amount) + changeAmount >= 1)
                ) {
                    newAmount = parseInt(cartElement.amount) + changeAmount;
                }
            }

            // Make sure that the new item amount is a finite number before changeing it 
            if (isNumber(newAmount) && newAmount > 0) {
                // Find the index of the cart item to be updated in the cart array, change it and overwrite the cart with the change.
                matchCartAction(currentCart, cartElement, index => {
                    let newCart = currentCart;
                    newCart[index].amount = newAmount;
                    Cart.overWrite(newCart);
                });
            }
            res.redirect('/cart');
        });
    }

    exports.removeCartItem = (req, res, next) => {
        // Get all cart items and store them in 'currentCart'
        Cart.fetchAll(currentCart => {
            const cartElement = JSON.parse(req.body.cartElement);
            // Find the index of the cart item to be deleted and overwrite the cart without the deleted cart item.
            matchCartAction(currentCart, cartElement, index => {
                let newCart = currentCart;
                newCart.splice(index, 1);
                if (isNumber(index)) {
                    Cart.overWrite(newCart);
                }
            });

            res.redirect('/cart');
        });
    }