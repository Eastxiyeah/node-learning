const http = require('http');
const url = require('url')

const start = (route, handle) => {
  http
    .createServer((req, res) => {
      const pathname = url.parse(req.url).pathname
      console.log(`Request for ${pathname} received`);

      route(handle, pathname, res)

      // res.writeHead(200, { 'Content-Type': 'text/plain' });
      // res.write(content);
      // res.end();
    })
    .listen(8888);

  console.log('Server has started');
};

exports.start = start;
