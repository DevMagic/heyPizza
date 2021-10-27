const Slack = require('slack');

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