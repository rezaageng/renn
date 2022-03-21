import { Event } from "../structures/Event"

export default new Event("ready", (client) => {
  client.user.setActivity("You", { type: "PLAYING" })
  console.log(`${client.user.tag} is alive!`)
})
