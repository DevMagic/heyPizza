const express = require('express')
const app = express()
 
app.post('/slack/events', function (req, res) {
  console.log('>>> req.params',req.params);
  console.log('>>> req.body',req.body);
  console.log('>>> req.query',req.query);
  console.log('>>> req',req);
})

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)