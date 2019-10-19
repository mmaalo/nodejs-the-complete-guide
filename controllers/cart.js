// imports

    // local imports

        // models
            const Cart = require('../models/cart');

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
            console.log(newCartItem.product.title);
            console.log(oldCart[0].product.title)
            console.log(oldCart.length)
            for (let i = 0; i > oldCart.length; i++) {
                console.log('fdsjlkajfsaldk')
               if (oldCart[i].product.title == newCartItem.product.title) {
                   this.alreadyInCart = true;
                   oldAmount = oldCart[i].amount;
                   newAmount = oldCart[i].amount + 1;
                   cartIndex = i;
                   break;
               }
               console.log(alreadyInCart)
            };
            if (alreadyInCart == true) {
                console.log('logging', alreadyInCart, cartIndex, oldAmount, newAmount);
            } else {
                console.log('logging', alreadyInCart, cartIndex, oldAmount, newAmount);
                newCartItem.save();
            }
            res.redirect('/cart');
        });

        // console.log(oldCart);

        // newCartItem.save();
        // res.redirect('/cart');
    }