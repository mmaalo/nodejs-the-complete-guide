const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    username: 'root',
    database: 'nodejs-course',
    password: 'password'
});

module.exports = pool.promise();