// const exec = require('child_process').exec;
const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

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
      <meta http-equiv="Content-Type" content="text/html;" charset="uft-8" />
    </head>
    <body>
      <form action="/upload" enctype="multipart/form-data" method="post">
        <input type="file" name="upload" />
        <input type="submit" value="Upload" />
      </form>
    </body>
  </html>
  `;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(body);
  res.end();
};

exports.upload = (res, req) => {
  console.log("Request handler 'upload' was called.");
  // return 'Hello upload';

  // res.writeHead(200, { 'Content-Type': 'text/plain' });
  // res.write(`You've sent: ${querystring.parse(postData).text}`);
  // res.end();

  const form = new formidable.IncomingForm();
  console.log('about to parse');

  form.parse(req, (err, fields, files) => {
    console.log('parsing done');
    // fs.renameSync(files.upload[0].filepath, `./tmp/test.png`);
    const sourceFile = files.upload[0].filepath;
    const destinationFile = "./tmp/test.png";

    fs.copyFileSync(sourceFile, destinationFile);

    fs.unlinkSync(sourceFile) // 删除原始文件

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('Received image: <br/>');
    res.write("<image src='/show' width='400px' style='margin: 12px 0;' />");
    res.write("<a href='/' style='display: block; width:110px; line-height: 32px; height: 32px; text-align: center; background: #1b1b1b; color: #fff; padding: 0 8px; border-radius: 4px; margin: 12px 0; cursor: pointer; text-decoration: none;'>Upload again</a>")
    res.end();
  });
};

exports.show = (res, req) => {
  console.log("Request handler 'show' was called.");
  fs.readFile(`${__dirname}/tmp/test.png`, 'binary', (err, file) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write(err + '\n');
      res.end();
    } else {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.write(file, 'binary');
      res.end();
    }
  });
};
