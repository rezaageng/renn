import { Event } from "../structures/Event"

export default new Event("ready", (client) => {
  client.user.setActivity("With You", { type: "PLAYING" })
  console.log(`${client.user.tag} is alive!`)
})
