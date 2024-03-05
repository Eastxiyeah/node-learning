const exec = require('child_process').exec;

exports.start = (res) => {
  console.log("Request handler 'start' was called.");

  // const sleep = (milliSeconds) => {
  //   const startTime = new Date().getTime()
  //   while (new Date().getTime() < startTime + milliSeconds) {

  //   }
  // }

  // 模拟阻塞
  // sleep(10000)
  // return 'Hello start'

  // --------------------------------------------------------

  // 模拟非阻塞
  // let content = 'empty'

  // exec("ls -lah", (error, stdout, stderr) => {
  //   content = stdout
  // })

  // return content;

  // --------------------------------------------------------

  // exec("ls -lah", (error, stdout, stderr) => {
  //   res.writeHead(200, {'Content-Type': 'text/plain'})
  //   res.write(stdout)
  //   res.end()
  // })

  exec(
    'find /',
    { timeout: 10000, maxBuffer: 20000 * 1024 },
    (error, stdout, stderr) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(stdout);
      res.end();
    }
  );
};

exports.upload = (res) => {
  console.log("Request handler 'upload' was called.");
  // return 'Hello upload';

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello Upload');
  res.end();
};
