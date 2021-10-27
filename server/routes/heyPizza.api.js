const { Router } = require('express');
const routes = Router();
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars')
const moment = require('moment');

Handlebars.registerHelper('select', function(selected, options) {
  return options.fn(this).replace(
      new RegExp(' value=\"' + selected + '\"'),
      '$& selected="selected"');
});

const serviceUser = require('./../services/user.service');
const serviceFeedback = require('./../services/feedback.service');
const slackFeedback = require('./../services/slack.service');

routes.get('/', async (request, response) => {
  try {
    
    let period = moment().locale('pt-br').format('MMMM'), order = 'name';

    const query = request.query;

    if(query.period){
      period = query.period;
    }

    if(query.order){
      order = query.order;
    }
    
    const users = await serviceUser.getAllUsersFeedbacks(period, order);


    let pathView = path.resolve(process.cwd() + '/server/view/index.html');
    
    let body = fs.readFileSync(pathView, 'utf8');
    let html =  Handlebars.compile(body)({users, period, order});
    response.status(200).send(html);

  }
  catch(e){
    console.log('>>> e', e);
    return response.status(400).send(e);
  }
  
})

routes.post('/new-feedback', async  (request, response) => {
  try {
    
    const CHANNEL_ID = 'CQNEAJSF4';
    // const CHANNEL_ID = 'C02K5QJ257V'; // canal de teste

    const message =  request.body.text;
    const userPostMessage = request.body.user_id;

    if(message.includes(userPostMessage)){
      return response.send('Não pode enviar feedback para si mesmo!');
    }

    await serviceFeedback.newFeedbackBySlackEvent({
      createdAt: null,
      text: message,
      user_external_id: userPostMessage
    })

    await slackFeedback.sendMessageToSlack({thread: null, channelId : CHANNEL_ID , message : message});
    return response.send('feedback enviado!');

  } catch (error) {
    console.log('>>> error', error);
    return response.send('Feedback não enviado, houve um problema!');
  }
  
})

module.exports = routes;