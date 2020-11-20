const axios = require('axios');
const fs = require('fs');
const { Router } = require('express')
const users = require('./feedbacks.json');
const routes = Router();

const channelId = 'C01B1CKBJB1'

routes.post('/slack/events', function (req, res) {
  
  
  // const event = req.body.event;
  console.log('>>> req.body',req.body);
  return   res.status(200).send(req.body.challenge);

  if(event.channel != channelId) return;
  
  let message = '';

  console.log('>>> req.body.channel != channelId',event.channel != channelId);
  console.log('>>> req.body.user',event.user);
  console.log('>>> req.body.text',event.text);
  

  let userGive = null;
  let userReceived = [];

  users.forEach(user => {
    if(event.user == user.id){
      userGive = user;
      message = `${user.name} deu o feedback`
    }
  })

  event.text = event.text.replace(`<@U01C6BK6DTJ>`,'')

  users.forEach(user => {
    if(!!~event.text.indexOf(user.id)){
      userReceived.push(user)
      event.text = event.text.replace(`<@${user.id}>`,user.name)
    }
  })

  message += event.text;

  console.log('>>> message',message);
  console.log('>>> userReceived',userReceived);
  console.log('>>> userGive',userGive);

  res.status(200).send(event.challenge);
})


routes.get('/ping', function (req, res) {
  res.send('pong')
})

async function _updateFile(data){
  fs.writeFile('.feedbacks.json', 
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