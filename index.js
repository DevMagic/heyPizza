const express = require('express')
const app = express()
 
const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/slack/events', function (req, res) {
  // console.log('>>> req.body',req.body);
  const event = req.body.event;

  let message = '';
  const users = [{
    id:'U01EVNH919Q',
    name:'Andrew dias'
  },
  {
    id:'U01BNAHRXSQ',
    name:'Gabriel laurencio'
  },
  {
    id:'U01C6BK6DTJ',
    name:'Bot teste'
  }]
  const channelId = 'C01B1CKBJB1'
  console.log('>>> req.body.channel != channelId',event.channel != channelId);
  console.log('>>> req.body.user',event.user);
  console.log('>>> req.body.text',event.text);
  if(event.channel != channelId){
    return;
  }

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


app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)