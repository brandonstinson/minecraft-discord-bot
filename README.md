# Minecraft Discord Bot

A Discord bot for Minecraft. It shows the current number of online players in the bot status. Optionally, it can send messages to a selected channel when a player logs on or off.

### Running locally

To run the bot locally:

1. Clone this repository
2. Run `npm install`
3. Fill in your environment variables on `.env.example` and rename the file to `.env`
4. Run `npm start`

### Running with Docker

A Docker image is available to run the bot. Create a `docker-compose.yml` or add the bot to an existing one. An example is available in this repository.

### Environment Variables

| Variable                | Required/Optional                     | Description                                                                                               |
| ----------------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `DISCORD_BOT_TOKEN`     | Required                              | The token for your Discord bot                                                                            |
| `MINECRAFT_SERVER_URL`  | Required                              | Your Minecraft server URL                                                                                 |
| `MINECRAFT_SERVER_PORT` | Optional<br/>Default: 25565           | Your Minecraft server port                                                                                |
| `PING_INTERVAL_SECONDS` | Optional<br/>Default: 60              | The update interval in seconds                                                                            |
| `SEND_MESSAGES`         | Optional<br/>Default: False           | If `True`, the bot will send a message to the selected channel when the number of online players changes. |
| `MESSAGE_CHANNEL_ID`    | Required if `SEND_MESSAGES` is `True` | The ID of the Discord channel where the bot will send messages                                            |
| `EXPRESS_PORT`          | Optional<br/>Default: 8000            | You can provide a specific port for Express                                                               |
