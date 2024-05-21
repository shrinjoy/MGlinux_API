const http = require('http');
const httpProxy = require('http-proxy');

// Target URL where the requests will be forwarded
const target = 'http://playjeeto.in:8083';

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create a basic HTTP server
const server = http.createServer((req, res) => {
    // Redirect requests to the target URL
    proxy.web(req, res, { target }, (err) => {
        console.error('Proxy error:', err);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Proxy error');
    });
});

// Handle proxy errors
proxy.on('error', (err, req, res) => {
    console.error('Proxy server error:', err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Proxy server error');
});

// Start the server on port 80
const port = 80;
server.listen(port, () => {
    console.log(`Reverse proxy server listening on port ${port}`);
});
