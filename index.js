require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const KIRM_ID = process.env.KIRM;
const KIRM_STORAGE = require('./storage.js');


client.login(TOKEN);

client.on('ready', () => {
  KIRM_STORAGE.init();
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  console.log(msg)
  if (msg.author.id === KIRM_ID) {
    msg.react('👍')
      .then(() => msg.react('👎'))
      .catch(() => console.error('One of the emojis failed to react.'));
  }
  if (msg.content === '!score') {
    KIRM_STORAGE.score()
    .then((score) => msg.channel.send(score))
    .catch(() => console.error('Failed to send message.'));
  }
});

client.on('messageReactionAdd', async (reaction, user) => {
  if(reaction.emoji.name === '👍') {
    KIRM_STORAGE.upvote();
  }
  else if (reaction.emoji.name === '👎') {
    KIRM_STORAGE.downvote();
  }
});

client.on('messageReactionRemove', (reaction, user) => {
	if(reaction.emoji.name === '👍') {
    KIRM_STORAGE.downvote();
  }
  else if (reaction.emoji.name === '👎') {
    KIRM_STORAGE.upvote();
  }
});
