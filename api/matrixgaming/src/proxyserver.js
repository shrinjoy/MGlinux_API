const https = require('https');
const httpProxy = require('http-proxy');
const fs = require('fs');

// Load SSL certificate and key
const options = {
  key: fs.readFileSync('./ssl/key.pem'),  // Path to your private key
  cert: fs.readFileSync('./ssl/cert.pem') // Path to your certificate
};

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Domain-to-target mapping
const domainMap = {
  'matrixgaming.in': 'http://77.37.47.190:82',
  'jackpotresult.live': 'http://77.37.47.190:81',
};

// Normalize host function
const normalizeHost = (host) => {
  if (!host) return '';
  return host.replace(/^www\./, ''); // Remove 'www.' if it exists
};

// HTTPS Server Logic
const httpsServer = https.createServer(options, (req, res) => {
  const host = normalizeHost(req.headers.host); // Get the requested domain
  const target = domainMap[host];

  if (target) {
    proxy.web(req, res, { target });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Domain not found');
  }
});

// Error handling for the proxy
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err);
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Internal Server Error');
});

// Start HTTPS server on port 443
httpsServer.listen(443, () => {
  console.log('HTTPS proxy server running on port 443');
});
