const express = require('express');
const routes = require('./server/routes');
const path = require('path')

try {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use('/public',express.static(path.resolve(__dirname + `\\server\\view\\public`)));
  server.use(routes);
  server.listen(3101, ()=>console.log('Server ON'));

} catch (e) {
  console.log('Server Off');
  console.log('>>> Error',e);

}


 
