import { MessageActionRow, MessageButton, TextChannel } from "discord.js"
import { Command } from "../../structures/Command"

export default new Command({
  name: "suggestion",
  description: "give us suggestion",
  options: [
    {
      name: "message",
      description: "write your suggestion",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const message = interaction.options.getString("message")
    const suggestionChannel = interaction.client.channels.cache.get(
      process.env.SUGGESTION_CHANNEL_ID
    ) as TextChannel

    if (
      interaction.channelId !== process.env.COMMANDS_CHANNEL_ID &&
      interaction.channelId !== process.env.DEBUG_CHANNEL_ID
    )
      return await interaction.reply({
        content: `Please use this command in  <#${process.env.COMMANDS_CHANNEL_ID}>`,
        ephemeral: true,
      })

    const suggestionButton = new MessageActionRow().addComponents(
      new MessageButton()
        .setLabel("Accept")
        .setStyle("PRIMARY")
        .setCustomId(`suggestion-accept-${interaction.user.id}`),
      new MessageButton()
        .setLabel("Reject")
        .setStyle("DANGER")
        .setCustomId(`suggestion-reject-${interaction.user.id}`),
      new MessageButton()
        .setLabel("Done")
        .setStyle("SUCCESS")
        .setCustomId(`suggestion-done-${interaction.user.id}`)
    )

    await suggestionChannel.send({
      content: `${interaction.user}: ${message}`,
      components: [suggestionButton],
    })
    return await interaction.reply({
      content: "Your suggestion has been sent",
      ephemeral: true,
    })
  },
})
