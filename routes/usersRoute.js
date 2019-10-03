const path = require('path');
const fs = require('fs');

const express = require('express');

const router = express.Router();

const rootDir = require('../util/path');

// /users --> Get
router.get('/users', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'users.html'));
    let users;
    if (fs.existsSync(path.join(rootDir, 'userdata.txt'))) {
        users = `<ul>
    ${fs.readFileSync(path.join(rootDir, 'userdata.txt'))}
</ul>`
    } else {
        users = `<h3>No Users Exist Yet</h3>`;
    }
    res.send(`
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
        <h1>Users:</h1>
        ${users}
    </main>
</body>
</html>`);
});

module.exports = router;