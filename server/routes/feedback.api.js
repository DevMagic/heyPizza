const { Router } = require('express');
const routes = Router();

routes.post('/', (request, response) => {
  try {
    
    return response.send('create user');
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.get('/', (request, response) => {
  try {
    
    return response.send('get all user');
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.get('/:feedbackId', (request, response) => {
  try {
    
    return response.send('get one user');
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.put('/:feedbackId', (request, response) => {
  try {    
    return response.send('update user');
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.delete('/:feedbackId', (request, response) => {
  try {
    return response.send('delete user');  
  } catch (error) {
    return response.status(400).send(error);
  }  
})


module.exports = routes;