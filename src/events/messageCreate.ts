import { TextChannel } from "discord.js"
import { client } from ".."
import { Event } from "../structures/Event"

export default new Event("messageCreate", async (message) => {
  // * first-rabbit message eevent
  if (!message.guild && !message.author.bot) {
    const channel = client.channels.cache.get(
      process.env.FIRST_RABBIT_CHANNEL_ID
    ) as TextChannel

    return channel.send({
      content: `${message.author.tag}: ${message.content}`,
      files: [...message.attachments.values()],
    })
  }

  // * sharing-session channel event
  if (message.channel.id === process.env.SHARE_CHANNEL_ID) {
    const msg = message.content

    return message.startThread({
      name: `${msg.length > 20 ? msg.substring(0, 20) + "..." : msg} - ${
        message.author.username
      } - ${new Date(message.createdTimestamp).toLocaleDateString()}`,
      autoArchiveDuration: 1440,
    })
  }
})
