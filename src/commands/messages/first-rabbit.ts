import { GuildMember } from "discord.js"
import { Command } from "../../structures/Command"

export default new Command({
  name: "first-rabbit",
  description: "you cant use this command",
  options: [
    {
      name: "member",
      description: "select member",
      type: "USER",
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
    const member = interaction.options.getMember("member") as GuildMember
    const message = interaction.options.getString("message")
    const admin = process.env.ADMIN_ID

    if (member.user.bot)
      return await interaction.reply({
        content: "Can't send message to bot!",
        ephemeral: true,
      })

    if (admin !== interaction.member.id)
      return await interaction.reply({
        content: "Sorry, only developers can use this command!",
        ephemeral: true,
      })

    member.send(message)

    return await interaction.reply(`To: ${member} msg: ${message}`)
  },
})
