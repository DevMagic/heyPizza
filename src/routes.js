require('dotenv').config();
const axios = require('axios')
const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const { Router } = require('express')

const routes = Router();
const service = require('./service');


routes.post('/slack/verification', service.verification)

routes.post('/slack/events', service.receiveEvent)

routes.get('/', service.getIndex)

routes.put('/users', service.updateUsers)

routes.get('/users', function (req, res) {
    console.log('getUsers', new Date());
    const users = require('./feedbacks.json');
    console.log('>>> users', users);
    res.status(200).send(users)
})

routes.get('/ping', function (req, res) {
    res.send('pong')
})

module.exports = routes
