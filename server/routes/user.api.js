const { Router } = require('express');
const routes = Router();

const serviceUser = require('./../services/user.service');

routes.post('/', async (request, response) => {
  try {
    const user = request.body;

    if(!user) {
      throw 'user invalid'
    }

    const userCreated = await serviceUser.create(user);

    return response.send(userCreated);
  } catch (error) {
    return response.status(400).send(error);
  }
  
})

routes.get('/', async (request, response) => {

  try {
    
    
    const users = await serviceUser.getAll();
    console.log('>>> users', users);
    return response.send(users);
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.get('/:userId', async (request, response) => {
  try {
    
    
    const userId = request.params.userId;
    
    if(!userId) {
      throw 'userId invalid'
    }
    
    const user = await serviceUser.getOne(userId);
    
    return response.send(user);
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.put('/:userId', async (request, response) => {
  try {
    
    const userId = request.params.userId;
    const user = request.body;
    
    if(!userId) {
      throw 'userId invalid'
    }

    user.id = userId;
    
    const userUpdated = await serviceUser.update(user);
    
    return response.send(userUpdated);
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.delete('/:userId', async (request, response) => {
  try {
    
    const userId = request.params.userId;
    
    if(!userId) {
      throw 'userId invalid'
    }
    
    const userDeleted = await serviceUser.delete(userId);
    
    return response.send(userDeleted);
  } catch (error) {
    return response.status(400).send(error);
  }
})

module.exports = routes;