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
      (ch) => ch.id === process.env.SHARE_CHANNEL_ID
    ) as TextChannel
    const debugChannel = process.env.DEBUG_CHANNEL_ID
    const message = interaction.options.getString("message")

    if (
      interaction.channel.type !== "DM" &&
      interaction.channelId !== process.env.ANON_CHANNEL_ID &&
      interaction.channelId !== debugChannel
    )
      return await interaction.reply({
        content: `This command only can use in <#${process.env.ANON_CHANNEL_ID}> and Direct Message`,
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
