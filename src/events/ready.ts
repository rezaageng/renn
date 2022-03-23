import chalk from "chalk"
import { Event } from "../structures/Event"

export default new Event("ready", (client) => {
  client.user.setActivity("With You", { type: "PLAYING" })
  console.log(chalk.bgGreen.black(`${client.user.tag} is alive!`))
})
