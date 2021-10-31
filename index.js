require('dotenv').config();
const express = require('express');
const routes = require('./server/routes');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
require('./swagger');

try {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));
  
  server.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  server.use('/public', express.static('server/view/public'));
  server.use(routes);
  server.listen(process.env.API_PORT, ()=>console.log(`Server Online - ${process.env.API_PORT}`));
} catch (e) {
  console.log(`Server Offline - ${process.env.API_PORT}`);
  console.log('>>> Error',e);
}
