import { GuildMember } from "discord.js"
import { Command } from "../../structures/Command"

export default new Command({
  name: "anon-message-user",
  description: "Send anonymous message someone",
  options: [
    {
      name: "message",
      description: "write a message",
      type: "STRING",
      required: true,
    },
    {
      name: "server-member",
      description: "select user from server",
      type: "USER",
      required: false,
    },
    {
      name: "user",
      description: "select user by user id",
      type: "STRING",
      required: false,
    },
  ],
  run: async ({ interaction, client }) => {
    const message = interaction.options.getString("message")
    const serverMember = interaction.options.getMember(
      "server-member"
    ) as GuildMember
    const user = interaction.options.getString("user")

    if (
      interaction.channel.type !== "DM" &&
      interaction.channelId !== process.env.ANON_CHANNEL_ID &&
      interaction.channelId !== process.env.DEBUG_CHANNEL_ID
    )
      return await interaction.reply({
        content: `This command only can use in <#${process.env.ANON_CHANNEL_ID}> and Direct Message`,
        ephemeral: true,
      })

    if (!serverMember && !user)
      return await interaction.reply({
        content: "Please select user from server or user id",
        ephemeral: true,
      })

    if (serverMember && user)
      return await interaction.reply({
        content: "Please select only one option",
        ephemeral: true,
      })

    if (serverMember) {
      if (serverMember.user.bot)
        return await interaction.reply({
          content: "Can't send message to bot!",
          ephemeral: true,
        })

      serverMember.send(
        message + "\n\n`this message sent with anonymous command`"
      )
    }

    if (user) {
      const userId = await client.users.fetch(user)
      if (userId.bot)
        return await interaction.reply({
          content: "Can't send message to bot!",
          ephemeral: true,
        })

      userId.send(message + "\n\n`this message sent with anonymous command`")
    }

    return await interaction.reply({
      content: "Anonymous message sent!",
      ephemeral: true,
    })
  },
})
