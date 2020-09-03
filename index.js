const express = require('express');
const Discord = require('discord.js');
const ping = require('minecraft-server-util');
require('dotenv').config();

const app = express();
const client = new Discord.Client();

const mcPort = process.env.MINECRAFT_SERVER_PORT || 25565;
const interval = process.env.PING_INTERVAL_SECONDS || 60;
const sendMessages = /true/i.test(process.env.SEND_MESSAGES);
const channel = process.env.MESSAGE_CHANNEL_ID;
const expressPort = parseInt(process.env.EXPRESS_PORT) || 8000;
let status;

client.once('ready', () => {
  console.log('Minecraft Discord Bot ready');
  pingServer();
  setInterval(pingServer, interval * 1000);
});

client.login(process.env.DISCORD_BOT_TOKEN);

const pingServer = () => {
  ping(process.env.MINECRAFT_SERVER_URL, parseInt(mcPort), (error, response) => {
    if (error) {
      console.error(error);
      client.user.setActivity(`couldn't ping`);
      return;
    }
    const { onlinePlayers } = response;
    if (onlinePlayers !== status) {
      client.user.setActivity(`- ${onlinePlayers}`);
      if (sendMessages && status !== undefined) {
        const message =
          status > onlinePlayers
            ? `A player logged off (${onlinePlayers} now playing)`
            : `A player logged on (${onlinePlayers} now playing)`;
        client.channels.fetch(channel).send(message);
      }
      status = onlinePlayers;
    }
  });
};

app.listen(expressPort, () => console.log(`Server running on port ${expressPort}`));
