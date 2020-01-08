// imports

    // npm imports
    const Sequelize = require('sequelize');

    // local imports
    const sequelize = require('../util/database');


// Cart model

    const Order = sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        quantity: Sequelize.INTEGER
    });
  
module.exports = Order;