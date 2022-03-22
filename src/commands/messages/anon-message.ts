import { TextChannel } from "discord.js"
import { Command } from "../../structures/Command"

export default new Command({
  name: "anon-message",
  description: "Send anonymous message to this server",
  options: [
    {
      name: "message",
      description: "write a message",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction, client }) => {
    const anonChannel = client.channels.cache.find(
      (ch) => ch.id === process.env.ANON_CHANNEL_ID
    ) as TextChannel
    const debugChannel = process.env.DEBUG_CHANNEL_ID
    const message = interaction.options.getString("message")

    if (interaction.channelId !== process.env.ANON_CHANNEL_ID || debugChannel)
      return await interaction.reply({
        content: `Cant use this command outside <#${process.env.ANON_CHANNEL_ID}>`,
        ephemeral: true,
      })

    if (anonChannel.type !== "GUILD_TEXT")
      return await interaction.reply({
        content: "Channel type is not text channel!",
        ephemeral: true,
      })

    anonChannel.send(message)

    return await interaction.reply({
      content: "Anonymous message sent!",
      ephemeral: true,
    })
  },
})
