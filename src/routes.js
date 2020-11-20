const axios = require('axios');
const fs = require('fs');
const { Router } = require('express')
const users = require('./feedbacks.json');
const routes = Router();

const channelId = 'C01B1CKBJB1'

routes.post('/slack/verification', function (req, res) {
  console.log('>>> req.body',req.body);
  return   res.status(200).send(req.body.challenge);
})
  

routes.post('/slack/events', async function (req, res) {
  
  
  const event = req.body.event;

  if(event.channel != channelId) return;
  
  let message = '';

  console.log('>>> req.body.channel != channelId',event.channel != channelId);
  console.log('>>> req.body.user',event.user);
  console.log('>>> req.body.text',event.text);
  

  let userGive = null;
  let userReceived = [];

  event.text = event.text.replace(`<@U01ETB3J1N3>`,'')

  users.forEach(user => {
    if(!!~event.text.indexOf(user.id)){
      event.text = event.text.replace(`<@${user.id}>`,user.name)
    }
  })

  users.forEach(user => {
    if(event.user == user.id){
      userGive = user;
      user.give.push(event.text);
    }
  })

  users.forEach(user => {
    if(!!~event.text.indexOf(user.name)){
      user.received.push({message:event.text,userId:userGive.id})
    }
  })

  console.log('>>> event.text',event.text);

  await _updateFile(users);

  return res.status(200).send(event.challenge);
})

routes.get('/dashboard', function (req, res) {
  res.status(200).send(`<pre>${JSON.stringify(users, null, 4)}</pre>`)
})

routes.get('/json', function (req, res) {
  res.status(200).send(users)
})

routes.get('/ping', function (req, res) {
  res.send('pong')
})

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