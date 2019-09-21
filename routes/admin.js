const express = require('express');

const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: true});

router.get('/add-product', (req, res, next) => {
    console.log(`I'm the add-product middleware`);
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Add Product Page</title>
        </head>
        <body>
            <form action="/product" method="post">
                <input type="text" name="title">
                <button type="submit">Add Product</button>
            </form>
        </body>
        </html>
    `);
});

router.post('/product', urlencodedParser, (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;