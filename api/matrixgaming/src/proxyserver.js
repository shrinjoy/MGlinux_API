const http = require("http");
const httpProxy = require("http-proxy");

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Set the target server (port 8087)
const target = "http://77.37.47.190:8087";

// Create the HTTP server to listen on port 80
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target }, (err) => {
    console.error("Proxy error:", err);
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway");
  });
});

// Handle proxy errors gracefully
proxy.on("error", (err, req, res) => {
  console.error("Proxy server error:", err);
  res.writeHead(502, { "Content-Type": "text/plain" });
  res.end("Bad Gateway");
});

// Start listening on port 80
server.listen(80, () => {
  console.log("Proxy server is running on http://matrixgaming.in (port 80)");
  console.log(`Forwarding requests to ${target}`);
});
const http = require("http");
const httpProxy = require("http-proxy");

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Set the target server (port 8087)
const target = "http://77.37.47.190:8087";

// Create the HTTP server to listen on port 80
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target }, (err) => {
    console.error("Proxy error:", err);
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway");
  });
});

// Handle proxy errors gracefully
proxy.on("error", (err, req, res) => {
  console.error("Proxy server error:", err);
  res.writeHead(502, { "Content-Type": "text/plain" });
  res.end("Bad Gateway");
});

// Start listening on port 80
server.listen(80, () => {
  console.log("Proxy server is running on http://matrixgaming.in (port 80)");
  console.log(`Forwarding requests to ${target}`);
});
