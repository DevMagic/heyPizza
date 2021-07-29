const express = require('express');
const routes = require('./server/routes');

try {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use(routes);
  // server.use(express.static('src/public'));
  server.listen(3000, ()=>console.log('Server ON'));

} catch (e) {
  console.log('Server Off');
  console.log('>>> Error',e);

}


 
