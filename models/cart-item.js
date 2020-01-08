// imports

    // npm imports
    const Sequelize = require('sequelize');

    // local imports
    const sequelize = require('../util/database');


// Cart model

    const CartItem = sequelize.define('cartItem', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: Sequelize.INTEGER
    });
  
module.exports = CartItem;