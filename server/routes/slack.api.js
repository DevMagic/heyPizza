const Slack = require('slack');
const { Router } = require('express');
const routes = Router();
const serviceFeedback = require('./../services/feedback.service');
const CHANNEL_ID = 'CQNEAJSF4';
const userService = require('./../services/user.service');

routes.post('/verification', function (req, res) {
  return   res.status(200).send(req.body.challenge);
})
  

routes.post('/webhooks', async (request, response) => {
  try {
    console.log('>>> request', request.body);

    if(request.body.type == 'url_verification'){
      console.log('challenge', request.body.challenge);
      return response.status(200).send(request.body.challenge);
    }

    const event = request.body.event;
    
    switch (event.type) {
      case 'member_joined_channel':

        if(CHANNEL_ID != event.channel){
          return response.status(300).send('channel invalid');
        }
        const externalId = event.user;
        const token = process.env.SLACK_BOT_TOKEN;
        let params = { user: externalId , token: token };
        let data = await Slack.users.info(params);
        let { profile } = data.user;

        const users = await userService.getUserByExternalId(externalId);

        if(!users.length){
          const newUser = {
            name: profile.real_name,
            externalId: externalId,
            profileImageUrl: profile.image_original,
          }

          console.log('>>> newUser', newUser);
          await userService.create(newUser);
        }


        break;
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
    console.log('>>> error', e);
    return response.status(400).send(e);
  }
  
})

module.exports = routes;