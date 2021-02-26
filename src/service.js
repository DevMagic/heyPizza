const users = require('./feedbacks.json')
const channelId =  process.env.channelId || 'C01B1CKBJB1';
const botId = process.env.botId || 'U01ETB3J1N3';
const fs = require('fs');
const moment = require('moment');
const _ = require('lodash');
// const axios = require('axios')
const path = require('path');	
const Handlebars = require('handlebars');
let USERS = require('./feedbacks.json');

exports.verification = (req, res) => {
    console.log('verification', new Date());
  return res.status(200).send(req.body.challenge)
};

exports.receiveEvent = async (req, res) => {
    try {

        console.log('>>> channelId', channelId);
        console.log('>>> botId', botId);

        const event = req.body.event

        if (event.channel != channelId) return

        let message = ''

        let userGive = null
        let userReceived = []

        event.text = event.text.replace(`<@${botId}>`, '')

        USERS.forEach((user) => {
            if (!!~event.text.indexOf(user.id)) {
                userReceived.push(user.id)
                event.text = event.text.replace(`<@${user.id}>`, user.name)
            }
        })

        USERS.forEach((user) => {
            if (event.user == user.id) {
                userGive = user
                user.give.push({ message: event.text, createdAt: new Date() })
            }
        })

        USERS.forEach((user) => {
            if (userReceived.find((id) => id == user.id)) {
                user.received.push({
                    message: event.text,
                    userId: userGive.id,
                    createdAt: new Date(),
                })
            }
        })

        await _updateFile(USERS)

        return res.status(200).send(event.challenge)
    } catch (error) {
        console.log('>>> receiveEvent', error);
    }
  
};

exports.getUsers = async (req, res) => {
    console.log('getUsers', new Date(),'>>> USERS', USERS);
    res.status(200).send(USERS)
}

exports.getIndex = async (req, res) => {
    try {
        let users = _.cloneDeep(USERS);
        
        const startMonth = moment().startOf('month');
        const endMonth = moment().endOf('month');
        console.log('>>> getIndex // startMonth', startMonth, 'endMonth', endMonth);
        users.forEach(user => {
            user.give = user.give.filter(g => moment(g.createdAt).isSameOrBefore(endMonth) && moment(g.createdAt).isSameOrAfter(startMonth) )
            user.received = user.received.filter(r => moment(r.createdAt).isSameOrBefore(endMonth) && moment(r.createdAt).isSameOrAfter(startMonth))
        })
        users = _.orderBy(users, ['name', ['asc']]);
        let body = fs.readFileSync(
            path.resolve(__dirname + '/public/index.html'),
            'utf8'
        )
        let html = Handlebars.compile(body)({ users })

        return res.status(200).send(html)
    } catch (error) {
        console.log('>>> getIndex', error);
    }
};

exports.updateUsers = async (req, res) => {
    try {
        console.log('updateUsers', new Date());
        const newUsers = req.body.users
        if (!users || !Array.isArray(users)) {
            return res.status(400).send({ error: 'invalid users' })
        }
        USERS = newUsers;
        await _updateFile(newUsers)
        res.status(200).send(USERS)
    } catch (error) {
        console.log('>>> updateUsers', error);
    }
  
};

async function _updateFile(data) {
  fs.writeFile(
      './src/feedbacks.json',
      JSON.stringify(data, null, 4),
      {
          enconding: 'utf-8',
      },
      function (err) {
          if (err) {
              throw err
          }
      }
  )
}