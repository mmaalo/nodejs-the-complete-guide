const path = require('path');

const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

// /admin/add-product --> GET
router.get('/add-product', (req, res, next) => {
    console.log(`I'm the add-product middleware`);
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
    // res.send(`
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //         <title>Add Product Page</title>
    //     </head>
    //     <body>
    //         <form action="/admin/add-product" method="post">
    //             <input type="text" name="title">
    //             <button type="submit">Add Product</button>
    //         </form>
    //     </body>
    //     </html>
    // `);
});

// /admin/add-product --> POST 
router.post('/add-product', urlencodedParser, (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;