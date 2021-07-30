const { Router } = require('express');
const routes = Router();


routes.use('/user', require('./user.api'));
routes.use('/feedback', require('./feedback.api'));
routes.get('/ping', async  (request, response) => {
  try {
    return response.send('pong');
  } catch (error) {
    console.log('>>> error', error);
    return response.send('deu ruim');
  }
  
})

module.exports = routes;