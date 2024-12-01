const http = require("http");

// Your domain name
const domainName = "matrixgaming.in";

// Create an HTTP server
const server = http.createServer((req, res) => {
  const redirectUrl = `http://${domainName}:8087${req.url}`;

  // Set HTTP status code to 301 (permanent redirect) or 302 (temporary redirect)
  res.writeHead(301, { Location: redirectUrl });
  res.end(); // End the response
  console.log(`Redirected request to ${redirectUrl}`);
});

// Listen on port 80
server.listen(80, () => {
  console.log("Redirect server running on port 80...");
});
