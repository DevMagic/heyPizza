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

module.exports = routes;