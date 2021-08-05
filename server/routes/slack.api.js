const { Router } = require('express');
const routes = Router();

const serviceFeedback = require('./../services/feedback.service');
const CHANNEL_ID = 'CQNEAJSF4';

routes.post('/verification', function (req, res) {
  return   res.status(200).send(req.body.challenge);
})
  

routes.post('/webhooks', async (request, response) => {
  try {
    console.log('>>> request', request.body);

    const event = request.body.event;
    
    switch (event.type) {
      case 'app_mention':
      
        if(CHANNEL_ID != event.channel){
          return response.status(300).send('channel invalid');
        }

        const feedbackEvent = {
          createdAt: event.ts,
          text: event.text,
          user_external_id: event.user,          
        }

        await serviceFeedback.newFeedbackBySlackEvent(feedbackEvent);

        break;
    
      default:
        break;
    }

    return response.status(200).send(request.body);

  }
  catch(e){
    return response.status(400).send(e);
  }
  
})

module.exports = routes;