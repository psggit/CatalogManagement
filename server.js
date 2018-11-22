const express = require('express');
const path = require('path')
const app = express();

app.get('*.js', function (req, res, next) {
  const runtimeUrlRegex = /runtime.*.js/
  if(!runtimeUrlRegex.test(req.url)) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
  } 
  next();
});

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res)=>{
  console.log(req.query);
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});