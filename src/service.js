const users = require('./feedbacks.json')
const channelId =  process.env.channelId || 'C01B1CKBJB1';
const botId = process.env.botId || 'U01ETB3J1N3';
const fs = require('fs');

exports.verification = (req, res) => {
  return res.status(200).send(req.body.challenge)
};

exports.receiveEvent = async (req, res) => {
    try {
        const event = req.body.event

        if (event.channel != channelId) return

        let message = ''

        let userGive = null
        let userReceived = []

        event.text = event.text.replace(`<@${botId}>`, '')

        users.forEach((user) => {
            if (!!~event.text.indexOf(user.id)) {
                userReceived.push(user.id)
                event.text = event.text.replace(`<@${user.id}>`, user.name)
            }
        })

        users.forEach((user) => {
            if (event.user == user.id) {
                userGive = user
                user.give.push({ message: event.text, createdAt: new Date() })
            }
        })

        users.forEach((user) => {
            if (userReceived.find((id) => id == user.id)) {
                user.received.push({
                    message: event.text,
                    userId: userGive.id,
                    createdAt: new Date(),
                })
            }
        })

        await _updateFile(users)

        return res.status(200).send(event.challenge)
    } catch (error) {
        console.log('>>> receiveEvent', error);
    }
  
};

exports.getIndex = async (req, res) => {
  const users = require('./feedbacks.json')
    let body = fs.readFileSync(
        path.resolve(__dirname + '/public/index.html'),
        'utf8'
    )
    let html = Handlebars.compile(body)({ users })

    res.status(200).send(html)
};

exports.updateUsers = async (req, res) => {
    try {
        const users = req.body.users
        if (!users || !Array.isArray(users)) {
            return res.status(400).send({ error: 'invalid users' })
        }
        await _updateFile(users)
        res.status(200).send(users)
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