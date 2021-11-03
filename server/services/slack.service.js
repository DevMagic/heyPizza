const Slack = require('slack');
const userService = require('./user.service');
const feedbackService = require('./feedback.service');

module.exports.webhook = async (event) => {
  switch (event.type) {
    case 'member_joined_channel':
      
      const externalId = event.user;
      const token = process.env.SLACK_BOT_TOKEN;
      let params = { user: externalId , token: token };
      let data = await Slack.users.info(params);
      let { profile } = data.user;

      const users = await userService.getUserByExternalId(externalId);

      if(!users.length){
        const newUser = {
          name: profile.real_name,
          externalId: externalId,
          profileImageUrl: profile.image_original,
        }

        console.log('>>> newUser', newUser);
        await module.exports.sendMessageToSlack({thread: null, channelId : process.env.SLACK_CHANNEL_ID , message : 'Seja bem-vindo a bordo :rocket:'});
        await userService.create(newUser);
      }


      break;
    case 'app_mention':

      const feedbackEvent = {
        createdAt: event.ts,
        text: event.text,
        user_external_id: event.user,          
      }

      await feedbackService.newFeedbackBySlackEvent(feedbackEvent);
      
      break;
  
    default:
      break;
  }
}

module.exports.sendMessageToSlack = async ({
  thread, 
  channelId, 
  message
}) => {
  
  if(!channelId && !message) throw 'ChannelId and message is required!'

  if(!thread){
   return publishMessage(channelId, message);
  }

  return replyMessage(channelId, thread, message);

}

async function publishMessage(channelId, message) {

  const result = await Slack.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: channelId,
    text: message  
  });
  
  return result;
  
}

async function replyMessage(channelId, thread, message) {

  const result = await Slack.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: channelId,
    thread_ts: thread,
    text: message
  });

  return result;
  
}