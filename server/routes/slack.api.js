const { Router } = require('express');
const routes = Router();
const CHANNEL_ID = 'CQNEAJSF4';
const slackService = require('./../services/slack.service');

routes.post('/verification', function (req, res) {
  return   res.status(200).send(req.body.challenge);
})
  
routes.post('/webhooks', async (request, response) => {
  try {
    console.log('>>> request', request.body);
    
    const typeEvent = request.body.type;

    if(typeEvent == 'url_verification'){    
      return response.status(200).send(request.body.challenge);
    }

    const event = request.body.event;

    if(CHANNEL_ID != event.channel){
      return response.status(300).send('channel invalid');
    }
    
    await slackService.webhook(event);

    return response.status(200).send();

  }
  catch(e){
    console.log('>>> error', e);
    return response.status(400).send(e);
  }
  
})

module.exports = routes;