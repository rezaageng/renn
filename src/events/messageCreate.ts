import { TextChannel } from "discord.js"
import { client } from ".."
import { Event } from "../structures/Event"

export default new Event("messageCreate", async (message) => {
  if (message.author.bot) return
  if (!message.guild) {
    const channel = client.channels.cache.get(
      process.env.FIRST_RABBIT_CHANNEL_ID
    ) as TextChannel

    return channel.send({
      content: `${message.author.tag}: ${message.content}`,
      files: [...message.attachments.values()],
    })
  }
})
