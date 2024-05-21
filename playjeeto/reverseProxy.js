const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const target = 'http://playjeeto.in:8082';

const server = http.createServer((res, req) => {
    proxy.web(req, res, { target });
})

proxy.on('error', (err, req, res) => {
    console.error('Proxy Error', err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end('Proxy Error');
});

const port = 80;
server.listen(port, () => {
    console.log('Reverse Proxy Working')
})
