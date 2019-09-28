const express = require('express');
const path = require('path')
const app = express();
// const chokidar = require('chokidar');
// const exec = require('child_process').exec;

// const cmd = "npm run build"

// const watcher = chokidar.watch(path.join(__dirname, 'src'), {
//   ignored: /(^|[\/\\])\../,
//   persistent: true
// })

// watcher.on('change', (path) => {
//   console.log(path)
//   exec(cmd, function(err, stdout, stderr) {
//     console.log(stdout)
//   })
// })



const env = process.env.NODE_ENV
if (env === 'production') {
  app.get('*.js', function (req, res, next) {
    console.log("req", req.url)
    const runtimeUrlRegex = /runtime.*.js/
    if (!runtimeUrlRegex.test(req.url)) {
      req.url = req.url + '.gz';
      res.set('Content-Encoding', 'gzip');
      res.set('Content-Type', 'text/javascript')
    }
    next();
  });
}

app.use('/admin', express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res) => {
  console.log(req.query);
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// Serve the files on port 3000.
app.listen(8080, function () {
  console.log('Example app listening on port 8080!\n');
});
