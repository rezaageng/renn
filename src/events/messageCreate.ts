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

  // * anon-message event
  if (message.channel.id === process.env.ANON_CHANNEL_ID) {
    return message.startThread({
      name: `${message.author.username} - ${new Date(
        message.createdTimestamp
      ).toLocaleDateString()}`,
      autoArchiveDuration: 1440,
    })
  }
})
