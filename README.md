# Minecraft Discord Bot

This bot displays the current number of online players in its status

### Docker Compose Example:

```yaml
# docker-compose.yml

version: '3'

services:
  app:
    image: brandonstinson/minecraft-discord-bot
    environment:
      - EXPRESS_PORT=3000
      - MINECRAFT_SERVER_URL=your.server.com
      - MINECRAFT_SERVER_PORT=25565
      - DISCORD_BOT_TOKEN=yourBotToken
      - PING_INTERVAL_SECONDS=20
    restart: always
```
