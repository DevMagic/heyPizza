const { Router } = require('express');
const routes = Router();

routes.post('/', (request, response) => {
  return response.send('create user');
})

routes.get('/', (request, response) => {
  return response.send('get all user');
})

routes.get('/:userId', (request, response) => {
  return response.send('get one user');
})

routes.put('/:userId', (request, response) => {
  return response.send('update user');
})

routes.delete('/:userId', (request, response) => {
  return response.send('delete user');
})


module.exports = routes;