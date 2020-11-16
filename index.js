const express = require('express')
const app = express()
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/slack/events', function (req, res) {
  console.log('>>> req.body',req.body);
  res.status(200).send(req.body.challenge);
})

app.post('/slack/listenChannel', function (req, res) {
  console.log('>>> req.body',req.body);
  // res.status(200).send(req.body.challenge);
})

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)