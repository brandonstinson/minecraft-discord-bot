const express = require('express');
const Discord = require('discord.js');
const ping = require('minecraft-server-util');
require('dotenv').config();

const app = express();
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Minecraft Discord Bot ready');
  pingServer();
  setInterval(() => pingServer(), 60000);
});

client.login(process.env.TOKEN);

let status;

const pingServer = () => {
  ping(process.env.MINECRAFT_SERVER, parseInt(process.env.MINECRAFT_PORT), (error, response) => {
    if (error) throw error;
    const { onlinePlayers } = response;
    if (onlinePlayers !== status) {
      client.user.setActivity(`- ${onlinePlayers}`);
      status = onlinePlayers;
    }
  });
};

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
