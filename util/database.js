const mysql = require('mysql2');

// MYSQL - Workbench
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'node-complete',
//     password: 'password'
// });

// module.exports = pool.promise();


// Sequelize:

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;