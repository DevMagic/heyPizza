const Slack = require('slack');
const moment = require('moment');

const repositoryFeedback = require('./../repositories/feedback.repository');
const serviceUser = require('./../services/user.service');

const token = process.env.SLACK_BOT_TOKEN;

module.exports.create = async (feedback) => {
  return repositoryFeedback.create(feedback);
}

module.exports.getAll = async () => {
  return repositoryFeedback.getAll();
}

module.exports.getOne = async (feedbackId) => {
  return repositoryFeedback.getOne(feedbackId);
}

module.exports.update = async (feedback) => {
  return repositoryFeedback.update(feedback);
}

module.exports.delete = async (feedbackId) => {
  return repositoryFeedback.delete(feedbackId);
}

module.exports.retroactive = async () => {

  let feedbacks = [];
  let nextCursor = null;
  do {
  
    let params = {channel: process.env.channelId, token: token};

    if(nextCursor){
      params.cursor = nextCursor;
    }

    let history = await Slack.conversations.history(params);
    feedbacks = feedbacks.concat(history.messages);

    nextCursor = history && history.response_metadata ? history.response_metadata.next_cursor : null;

  } while (nextCursor);

  for (const feedback of feedbacks) {
    if(feedback['reply_count']){
      let params = {channel: process.env.channelId, token: token, ts: feedback.ts};
      let history = await Slack.conversations.replies(params);
      feedbacks = feedbacks.concat(history.messages);
    }
  }

  const users = await serviceUser.getAll();

  let botId = process.env.botId;
  feedbacks = feedbacks.filter(feedback => !!~feedback.text.indexOf(botId));

  const newFeedbacks = [];

  feedbacks.forEach(feedback => {
    let usersPraised = []
    let user = users.find(u => u.externalId == feedback.user);
    if(user){
      let userId = user.id;
      let createdAt = feedback.ts;
      let message = feedback.text;
      let pizza = duplicateCount(feedback.text, ':pizza:');
      pizza = pizza > 2 ? 2 : pizza;
      pizza = pizza == 0 ? 1 : pizza;
      message = message.replace(`<@${botId}>`, '@heyPizza');

      for (const user of users) {
        if(!!~message.indexOf(`<@${user.externalId}>`)){
          usersPraised.push(user.id);
          message = message.replace(`<@${user.externalId}>`, user.name);
        }
      }


      for (const userPraised of usersPraised) {
        newFeedbacks.push({
          user_praised_id: userPraised,
          user_id: userId,
          message: message,
          pizza: pizza,
          createdAt: moment.unix(createdAt).toDate()
        })
      }
    }
    
  });
  
  for (const newFeedback of newFeedbacks) {
    await this.create(newFeedback);
  }

  return { newFeedbacks };
}

function duplicateCount(text, key) {
  let count = 0;
  while(!!~text.indexOf(key)){
    count++;
    text = text.replace(key, '');
    
  }
  return count;
}