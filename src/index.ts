import { Client } from "discord.js"
import "dotenv/config"

const client = new Client({
  partials: ["CHANNEL"],
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS",
    "GUILD_VOICE_STATES",
    "DIRECT_MESSAGES",
  ],
})

let bot = {
  client,
  dev: process.env.DEV,
}

console.log("hello")

client.login(process.env.TOKEN)
