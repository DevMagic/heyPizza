const { Router } = require('express');
const routes = Router();
const serviceFeedback = require('./../services/feedback.service');

routes.post('/', async (request, response) => {
  try {
    // #swagger.tags = ['Feedback']
    const feedback = request.body;

    if(!feedback){
      throw 'feedback invalid'
    }

    const feedCreated = await serviceFeedback.create(feedback);

    return response.send(feedCreated);

  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.get('/', async (request, response) => {
  try {
    // #swagger.tags = ['Feedback']
    const feedbacks = await serviceFeedback.getAll();
    
    return response.send(feedbacks);
    
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.get('/:feedbackId', async (request, response) => {
  try {
    // #swagger.tags = ['Feedback']
    const feedbackId = request.params.feedbackId;
    
    if(!feedbackId) {
      throw 'feedbackId invalid'
    }
    
    const feedback = await serviceFeedback.getOne(feedbackId);
    
    return response.send(feedback);
    
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.put('/:feedbackId', async (request, response) => {
  try {
    // #swagger.tags = ['Feedback']
    const feedbackId = request.params.feedbackId;
    const feedback = request.body;
    
    if(!feedback) {
      throw 'feedbackId invalid'
    }

    feedback.id = feedbackId;
    
    const feedbackUpdated = await serviceFeedback.update(feedback);
    
    return response.send(feedbackUpdated);
  } catch (error) {
    return response.status(400).send(error);
  }
})

routes.delete('/:feedbackId', async (request, response) => {
  try {
    // #swagger.tags = ['Feedback']
    const feedbackId = request.params.feedbackId;
    
    if(!feedbackId) {
      throw 'feedbackId invalid'
    }
    
    const feedbackDeleted = await serviceFeedback.delete(feedbackId);
    
    return response.send(feedbackDeleted);
  } catch (error) {
    return response.status(400).send(error);
  }  
})

routes.post('/retroactive', async (request, response) => {
  try {
    // #swagger.tags = ['Feedback']
    return response.send(await serviceFeedback.retroactive());
  } catch (error) {
    console.log('>>> error', error);
    return response.status(400).send(error);
  }
})

routes.get('/user/:userId', async (request, response) => {
  try {
    // #swagger.tags = ['Feedback']
    const userId = request.params.userId;

    return response.send(await serviceFeedback.getFeedbacksByUserId(userId));
  } catch (error) {
    console.log('>>> error', error);
    return response.status(400).send(error);
  }
})




module.exports = routes;