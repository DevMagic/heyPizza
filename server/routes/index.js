const { Router } = require('express');
const routes = Router();


routes.use('/user', require('./user.api'));
routes.use('/feedback', require('./feedback.api'));

routes.get('/ping', (request, response) => {
  return response.send('pong');
})

module.exports = routes;