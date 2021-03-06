import { TextChannel } from "discord.js"
import { Command } from "../../structures/Command"

export default new Command({
  name: "shinra",
  description: "you cant use this command",
  options: [
    {
      name: "text-channel",
      description: "select text channel",
      type: "CHANNEL",
      channel_types: [0],
      required: true,
    },
    {
      name: "message",
      description: "write a message",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const channel = interaction.options.getChannel(
      "text-channel"
    ) as TextChannel
    const message = interaction.options.getString("message")
    const admin = process.env.ADMIN_ID

    if (admin !== interaction.member.id)
      return await interaction.reply({
        content: "Sorry, only developers can use this command!",
        ephemeral: true,
      })

    if (interaction.channelId !== process.env.ADMINISTRATOR_CHANNEL_ID)
      return await interaction.reply({
        content: `Cant use this command outside <#${process.env.ADMINISTRATOR_CHANNEL_ID}>`,
        ephemeral: true,
      })

    if (channel.type !== "GUILD_TEXT")
      return await interaction.reply({
        content: "Only can send message to text channel!",
        ephemeral: true,
      })

    channel.send(message)

    return await interaction.reply(`message sent to ${channel}`)
  },
})
