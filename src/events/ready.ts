import chalk from "chalk"
import { Event } from "../structures/Event"
import http from "http"

export default new Event("ready", (client) => {
  http.createServer((_req, res) => res.end("ily :3")).listen(3000)

  client.user.setStatus("idle")
  client.user.setActivity("With You", { type: "PLAYING" })
  console.log(chalk.bgGreen.black(`${client.user.tag} is alive!`))
})
