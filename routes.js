const requestHandler = (req, res) => {
    url = req.url;
    method = req.method;
    res.users = [];

    if (url === '/') {
        res.write(`
        <html>
            <head>
                <title>Assignment: Root</title> 
            </head>
            <body>
                <h1>Create User</h1>
                <form action="/create-user" method="POST">
                    <input type="text" name="username">
                    <button type="submit">Click Me</button>
                </form>
            </body>
        </html> 
        `);
        return res.end();
    }
    
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            res.write(`
            <html>
                <head>
                    <title>Assignment: User Created</title> 
                </head>
                <body>
                    <h1>User Name Is: "${user}"</h1>
                </body>
            </html> 
            `);
        });
    }

    if (url === '/users') {
        res.write(`
        <html>
            <head>
                <title>Assignment: Users</title> 
            </head>
            <body>
                <h1>Users Route</h1>
            </body>
        </html> 
        `);
        return res.end();
    }

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
};

module.exports = {
    handler: requestHandler
};