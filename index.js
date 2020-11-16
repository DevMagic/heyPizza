const express = require('express')
const app = express()
 
app.post('/slack/events', function (req, res) {
  console.log('>>> req.params',req.params);
  console.log('>>> req.body',req.body);
})

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)