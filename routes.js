const fs = require('fs');

users = [];

const requestHandler = (req, res) => {
    url = req.url;
    method = req.method;

    // "/" route
    if (url === '/') {
        res.write(`
        <html>
            <head>
                <title>Assignment: Root</title> 
            </head>
            <body>
                <h1>Create User</h1>
                <form action="/create-user" method="POST" enctype="text/plain"> <!-- enctype="text/plain fixes encoding issue where space is saved as a '+' sign -->
                    <input type="text" name="username">
                    <button type="submit">Click Me</button>
                </form>
            </body>
        </html> 
        `);
        return res.end();
    }
   
    // "/create-user" route
    else if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            res.writeHead(302, {
                'Location': '/users'
            });
            users.push(user);
            res.write(`
            <html>
                <head>
                    <title>User Created</title> 
                </head>
                <body>
                    <h1>User Name Is: "${user}"</h1>
                </body>
            </html> 
            `);
        });
    }

    // "/users" route
    else if (url === '/users') {
        let userlist = "";
        users.forEach((i) => {
            userlist += `<li>${i}</li>
`;
        })
        if (fs.existsSync('./users.txt')) {
            const olduserlist = fs.readFileSync('./users.txt');
            let newuser;
            if (typeof users[users.length -1] === undefined) {
                newuser = '';
            }
            else {
                newuser = `<li>${users[users.length -1]}</li>
`;
            }
            userlist = olduserlist + newuser;
            fs.writeFileSync('./users.txt', userlist);
        } else {
            fs.writeFileSync('./users.txt', userlist)
        }
        res.write(`
        <html>
            <head>
                <title>Assignment: Users</title> 
            </head>
            <body>
                <h1>All Users</h1>
                <ul>
                    ${userlist}
                </ul>
            </body>
        </html> 
        `);
        return res.end();
    }

    else {
    res.writeHead(200, {
        'type': 'html/text'
    }); 
    res.write(`
    <html>
        <head>
            <title>Assignment</title> 
        </head>
        <body>
            <h1>Yo</h1>
        </body>
    </html> 
    `)
    res.end();
    }

};

module.exports = {
    handler: requestHandler
};