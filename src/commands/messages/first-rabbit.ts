module.exports = {
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
    const member = interaction.options.getMember("member")
    const message = interaction.options.getString("message")
    const admin = process.env.ADMIN_ID

    if (member.user.bot)
      return await interaction.reply("Can't send message to bot!")

    if (admin !== interaction.member.id)
      return await interaction.reply({
        content: `Sorry, only developers can use this command!`,
        ephemeral: true,
      })

    member.send(message)

    return await interaction.reply(`To: ${member} msg: ${message}`)
  },
}
