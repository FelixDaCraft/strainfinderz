const express = require('express');
const server= express();

server.set('view engine', 'html');

server.engine('html', require('ejs').renderFile);
server.get('/', function(request, res) {
    res.render('./index.html');
  });
  server.listen(process.env.PORT);