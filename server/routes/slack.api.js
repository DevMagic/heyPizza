const { Router } = require('express');
const routes = Router();
const slackService = require('./../services/slack.service');
const feedbackService = require('./../services/feedback.service');

routes.post('/verification', function (req, res) {
    // #swagger.tags = ['Slack']
    return res.status(200).send(req.body.challenge);
})
  
routes.post('/webhooks', async (request, response) => {
  try {
    // #swagger.tags = ['Slack']
    console.log('>>> request', request.body);
    
    const typeEvent = request.body.type;

    if(typeEvent == 'url_verification'){    
      return response.status(200).send(request.body.challenge);
    }

    const event = request.body.event;

    if(process.env.SLACK_CHANNEL_ID != event.channel){
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

routes.post('/new-feedback', async  (request, response) => {
  try {
    // #swagger.tags = ['Slack']
    const CHANNEL_ID = process.env.SLACK_CHANNEL_ID;
    const message =  request.body.text;
    const userPostMessage = request.body.user_id;

    if(message.includes(userPostMessage)){
      return response.send('Não pode enviar feedback para si mesmo!');
    }

    const feedbacks = await feedbackService.newFeedbackBySlackEvent({
      createdAt: null,
      text: message,
      user_external_id: userPostMessage
    })

    if(feedbacks && feedbacks.length == 0){
      return response.send('Não foi possivel enviar feedback, nenhum usuario foi marcado!');
    }

    await slackService.sendMessageToSlack({thread: null, channelId : CHANNEL_ID , message : message});
    return response.send('feedback enviado!');

  } catch (error) {
    console.log('>>> error', error);
    return response.send('Feedback não enviado, houve um problema!');
  }
  
})

module.exports = routes;