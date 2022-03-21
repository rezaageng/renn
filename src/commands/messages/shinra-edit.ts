import { channel } from "diagnostics_channel"
import { TextChannel } from "discord.js"
import G from "glob"
import { Command } from "../../structures/Command"

export default new Command({
  name: "shinra-edit",
  description: "you cant use this command",
  options: [
    {
      name: "text-channel",
      description: "select text channel",
      type: "CHANNEL",
      required: true,
    },
    {
      name: "message-id",
      description: "paste message id",
      type: "STRING",
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
    const messageId = interaction.options.getString("message-id")
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

    const fetchedMessage = await channel.messages.fetch(messageId)

    if (!fetchedMessage.editable)
      return await interaction.reply({
        content: "Message is not editable!",
        ephemeral: true,
      })

    await fetchedMessage.edit(message)

    return await interaction.reply(
      `[message edited](https://discord.com/channels/${process.env.GUILD_ID}/${channel.id}/${messageId})`
    )
  },
})
