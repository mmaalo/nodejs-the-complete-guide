// imports
    
    // core imports

    // npm imports
        const express = require('express');
        const router = express.Router(); 
        const bodyParser = require('body-parser');
        const urlendcoded = bodyParser.urlencoded({extended: true});

    // local imports

// routes

router.get('/users', (req, res, next) => {
    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Home</title>
        <link rel="stylesheet" href="/css/main.css">
    </head>
    <body>
        <header class="main-header">
            <nav class="main-header__nav">
                <ul class="main-header__item-list">
                    <li class="main-header__item"><a href="/">Home</a></li>
                    <li class="main-header__item"><a href="/users">Users</a></li>
                </ul>
            </nav>
        </header>
        <main>
        </main>
    </body>
    </html>
    `);
});

module.exports = router;