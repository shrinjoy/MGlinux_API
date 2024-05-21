const http = require('http');
const httpProxy = require('http-proxy');

const target = 'http://playjeeto.in:8083';

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
    proxy.web(req, res, { target }, (err) => {
        console.error('Proxy error:', err);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Proxy error');
    });
});

proxy.on('error', (err, req, res) => {
    console.error('Proxy server error:', err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Proxy server error');
});

const port = 80;
server.listen(port, () => {
    console.log(`Reverse proxy server listening on port ${port}`);
});
