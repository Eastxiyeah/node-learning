// const exec = require('child_process').exec;
const querystring = require('querystring')

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

  // 模拟非阻塞
  // exec(
  //   'dir /s /b C:\\', // 列出C盘下的所有文件和目录，包括子目录中的文件和目录。/s选项表示递归搜索，/b选项表示以简洁方式输出文件和目录的路径。
  //   { timeout: 10000, maxBuffer: 20000 * 1024 },
  //   (error, stdout, stderr) => {
  //     res.writeHead(200, { 'Content-Type': 'text/plain' });
  //     res.write(stdout);
  //     res.end();
  //   }
  // );

  const body = `
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html;" charset="utf-8" />
    </head>
    <body>
      <form action="/upload" method="post">
        <textarea name="text" rows="20" cols="60"></textarea>
        <input type="submit" value="Submit" />
      </form>
    </body>
  </html>
  `

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(body)
  res.end()
};

exports.upload = (res, postData) => {
  console.log("Request handler 'upload' was called.");
  // return 'Hello upload';

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write(`You've sent: ${querystring.parse(postData).text}`);
  res.end();
};
