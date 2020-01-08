// imports

    // npm imports
    const Sequelize = require('sequelize');

    // local imports
    const sequelize = require('../util/database');


// Cart model

    const OrderItem = sequelize.define('orderItem', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: Sequelize.INTEGER
    });
  
module.exports = OrderItem;