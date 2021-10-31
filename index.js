const express = require('express');
const routes = require('./server/routes');

try {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  server.use('/public', express.static('server/view/public'));
  server.use(routes);
  server.listen(process.env.API_PORT, ()=>console.log(`Server Online - ${process.env.API_PORT}`));
} catch (e) {
  console.log(`Server Offline - ${process.env.API_PORT}`);
  console.log('>>> Error',e);
}
