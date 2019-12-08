const fs = require('fs');
const path = require('path').join(__dirname, 'dist');
const zlib = require('zlib');
const gzip = zlib.createGzip();
const { exec } = require('child_process');

fs.readdirSync(path).forEach((file) => {
  if(file.indexOf('.js') > 0) {
    exec(`uglifyjs dist/${file}`,{'maxBuffer': 2*1024*1024}, (err, stdout, stderr) => {
      if (err) {
        console.error(`failed: uglifyjs ${file}`, err);
      } else {
        if (!!stdout) {
          console.log(`uglifyjs: ${file}`);
        }
        if (!!stderr) {
          console.log(`stderr: ${stderr}`);
        }
      }
    });
    exec(`browserify -s dist/${file}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`failed: browserify -s ${file}`, err);
      } else {
        if (!!stdout) {
          console.log(`browserify: ${file}`);
        }
        if(!!stderr) {
          console.log(`stderr: ${stderr}`);
        }
      }
    });
  }
}, err => {
  console.error(err);
});
