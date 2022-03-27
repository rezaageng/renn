import chalk from "chalk"
import { Event } from "../structures/Event"

export default new Event("ready", (client) => {
  const memberCount = client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)

  client.user.setActivity(`With ${memberCount} others`, { type: "PLAYING" })
  console.log(chalk.bgGreen.black(`${client.user.tag} is alive!`))
})
