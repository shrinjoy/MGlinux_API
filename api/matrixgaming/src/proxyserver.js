const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server
const proxy = httpProxy.createProxyServer({});

// Main server logic
const server = http.createServer((req, res) => {
  const host = req.headers.host; // Get the requested domain

  console.log(host)

  if (host === 'matrixgaming.in') {
    // Forward to the app running on port 3000
    proxy.web(req, res, { target: 'http://77.37.47.190:80' });
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
