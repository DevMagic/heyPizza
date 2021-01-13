const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars')
const { Router } = require('express')
const users = require('./feedbacks.json');
const routes = Router();

const channelId = 'C01B1CKBJB1'

routes.post('/slack/verification', function (req, res) {
  return   res.status(200).send(req.body.challenge);
})
  

routes.post('/slack/events', async function (req, res) {
  
  
  const event = req.body.event;

  if(event.channel != channelId) return;
  
  let message = '';

  let userGive = null;
  let userReceived = [];

  event.text = event.text.replace(`<@U01ETB3J1N3>`,'')

  users.forEach(user => {
    if(!!~event.text.indexOf(user.id)){
      userReceived.push(user.id);
      event.text = event.text.replace(`<@${user.id}>`,user.name)
    }
  })

  users.forEach(user => {
    if(event.user == user.id){
      userGive = user;
      user.give.push({message:event.text, createdAt:new Date()});
    }
  })

  users.forEach(user => {
    if(userReceived.find(id => id == user.id)){
      user.received.push({message:event.text,userId:userGive.id,createdAt:new Date()})
    }
  })

  await _updateFile(users);

  return res.status(200).send(event.challenge);
})

routes.get('/', function (req, res) {
  const users = require('./feedbacks.json');
  let body = fs.readFileSync(path.resolve(__dirname + '/public/index.html'), 'utf8');
  let html =  Handlebars.compile(body)({users});

  res.status(200).send(html);

})

routes.get('/users', function (req, res) {
  const users = require('./feedbacks.json');
  res.status(200).send(users);
});

routes.put('/users', async function (req, res) {
  const users = req.body.users;
  if(!users || !Array.isArray(users)){
    return res.status(400).send({error:'invalid users'});
  }
  await _updateFile(users);
  res.status(200).send(users);
})



routes.get('/ping', function (req, res) {
  res.send('pong')
});

async function _updateFile(data){
  fs.writeFile('./src/feedbacks.json', 
    JSON.stringify(data, null, 4),
    {
      enconding:'utf-8'
    }, 
    function (err) {
      if (err) {
        throw err
      };
    }
  );
}

module.exports = routes;