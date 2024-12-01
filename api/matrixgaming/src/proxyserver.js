const http = require("http");

// Your VPS IP address
const serverIp = '77.37.47.190"'; // Replace with your VPS IP

// Create an HTTP server
const server = http.createServer((req, res) => {
  const redirectUrl = `http://${serverIp}:8087${req.url}`;

  // Set HTTP status code to 301 (permanent redirect) or 302 (temporary redirect)
  res.writeHead(301, { Location: redirectUrl });
  res.end(); // End the response
  console.log(`Redirected request to ${redirectUrl}`);
});

// Listen on port 80
server.listen(80, () => {
  console.log("Redirect server running on port 80...");
});
