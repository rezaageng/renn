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
      name: "user-id",
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
    const user = interaction.options.getString("user-id")

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

      serverMember.send("`anon:` " + message)
    }

    if (user) {
      const userId = await client.users.fetch(user)
      const mutualGuilds = client.guilds.cache.filter((guild) => {
        return guild.members.cache.has(userId.id)
      })

      if (userId.bot)
        return await interaction.reply({
          content: "Can't send message to bot!",
          ephemeral: true,
        })

      if (mutualGuilds.size === 0)
        return await interaction.reply({
          content: "User not in any mutual discord server with me",
          ephemeral: true,
        })

      userId.send("`anon:` " + message)
    }

    return await interaction.reply({
      content: "Anonymous message sent!",
      ephemeral: true,
    })
  },
})
