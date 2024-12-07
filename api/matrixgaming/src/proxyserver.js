const http = require('http');
const https = require('https');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Normalize host function
const normalizeHost = (host) => {
    if (!host) return '';
    return host.replace(/^www\./, ''); // Remove 'www.' if it exists
};

// Main server logic
const server = http.createServer((req, res) => {
    const host = normalizeHost(req.headers.host); // Get the requested domain

    if (host === 'matrixgaming.in') {
        // Forward to the app running on port 3000
        proxy.web(req, res, { target: 'http://77.37.47.190:82' });
    } else if (host === 'jackpotresult.live') {
        // Forward to the app running on port 4000
        proxy.web(req, res, { target: 'http://77.37.47.190:81' });
    } else {
        // Default response for unknown domains
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Domain not found');
    }
});

// Start server on port 80
server.listen(80, () => {
    console.log('Proxy server running on port 80');
});

// HTTPS-to-HTTP redirection server logic
const httpsServer = https.createServer(options, (req, res) => {
    const host = normalizeHost(req.headers.host); // Get the domain name from request headers
    const url = req.url;                          // Get the requested URL

    // Redirect all HTTPS requests to HTTP
    res.writeHead(301, { Location: `http://${host}${url}` });
    res.end();
});

// Start HTTPS server on port 443
httpsServer.listen(443, () => {
    console.log('HTTPS to HTTP redirection server running on port 443');
});
