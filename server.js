const http = require("http");

http
  .createServer((req, res) => {
    console.log("Request received");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Good job");
    res.end();
  })
  .listen(8888);

console.log("Server has started");
