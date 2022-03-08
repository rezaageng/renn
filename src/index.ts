import { Client, Collection } from "discord.js"
import "dotenv/config"
import config from "./config"

const client: any = new Client({
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
  dev: config.DEV,
}

client.commands = new Collection()
client.on("ready", () => {
  console.log(`${client.user?.tag} is online!`)
  client.user?.setActivity("Your Voice", { type: "LISTENING" })
})

client.login(config.TOKEN)
