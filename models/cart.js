// imports

    // npm imports
    const Sequelize = require('sequelize');

    // local imports
    const sequelize = require('../util/database');


// Cart model

    const Cart = sequelize.define('cart', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        }
    });
  
module.exports = Cart;