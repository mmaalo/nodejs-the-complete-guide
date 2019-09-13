const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(`
        <body>
            <form action="/message" method="POST">
                <input type="text" name="message">  <button type="submit">Send</button>
            </form>
        </body>
    `);
    res.write('</html>');
    return res.end();
}
if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
    });
    return req.on('end', () => { // return makes sure that the req.on() block is executed and that the code below is not. 
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody);
        const message = parsedBody.split('=')[1];
        fs.writeFile('message.txt', message, err => {
            res.writeHead(302, {
                'Location': '/'
            });
            return res.end();
        });
    });
}
res.setHeader('Content-Type', 'text/html');
res.write('<html>');
res.write('<head><title>My First Page</title><head>');
res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
res.write('</html>');
res.end();

};

// // Several ways to export one element or several elements from one file:

// module.exports = requestHandler;

// module.exports.handler = requesthandler;
// module.exports.someText = 'SOME HARD CODED TEXT';

// exports.handler = requesthandler;
// exports.someText = 'SOME HARD CODED TEXT';

module.exports = {
    handler: requestHandler,
    someText: 'Some hard coded text'
}
