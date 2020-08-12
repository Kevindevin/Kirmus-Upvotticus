require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const KIRM_ID = process.env.KIRM;

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.author.id === KIRM_ID) {
    msg.react('👍')
      .then(() => msg.react('👎'))
      .catch(() => console.error('One of the emojis failed to react.'));
  } 
});
