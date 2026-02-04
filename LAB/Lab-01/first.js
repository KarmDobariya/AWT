let http = require('http');
http.createServer(function (req, res) {
   res.write(`
    <html>
      <head>
        <title>My First Node Page</title>
      </head>
      <body>
        <h1>Hello from Node.js </h1>
        <p>This HTML is written inside Node</p>
      </body>
    </html>
  `);
  res.end();
}).listen(8080);
