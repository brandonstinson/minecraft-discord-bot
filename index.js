const express = require('express');
const Discord = require('discord.js');
const ping = require('minecraft-server-util');
require('dotenv').config();

const app = express();
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Minecraft Discord Bot ready');
  startPing();
});

client.login(process.env.DISCORD_BOT_TOKEN);

let status;

const startPing = () => {
  try {
    pingServer();
  } catch (error) {
    console.error(error);
    setTimeout(() => startPing(), 5000);
    return;
  }
  setInterval(() => pingServer(), process.env.PING_INTERVAL * 1000);
};

const pingServer = () => {
  ping(
    process.env.MINECRAFT_SERVER_URL,
    parseInt(process.env.MINECRAFT_SERVER_PORT),
    (error, response) => {
      if (error) throw error;
      const { onlinePlayers } = response;
      if (onlinePlayers !== status) {
        client.user.setActivity(`- ${onlinePlayers}`);
        status = onlinePlayers;
      }
    }
  );
};

const port = process.env.EXPRESS_PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
