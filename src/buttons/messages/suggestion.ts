import { Message, MessageActionRow } from "discord.js"
import { Button } from "../../structures/Button"

export default new Button({
  name: "suggestion",
  run: async ({ interaction, action, user, client }) => {
    const components = interaction.message.components[0] as MessageActionRow
    const message = interaction.message as Message

    if (!user) return interaction.reply("User not found")
    const member = await client.users.fetch(user)

    if (action === "accepted") {
      components.components[0].setDisabled(true)
      components.components[1].setDisabled(true)
      components.components[2].setDisabled(false)

      message.pin()
    }

    if (action === "rejected" || action === "finished") {
      components.components[0].setDisabled(true)
      components.components[1].setDisabled(true)
      components.components[2].setDisabled(true)

      message.unpin()
    }

    await member.send(
      `Your suggestion for "${message.content
        .split(":")[1]
        .trim()}" has been ${action}`
    )

    await interaction.update({
      components: [components],
    })

    return (await interaction.followUp(
      `Suggestion ${action} by ${interaction.user}`
    )) as Message
  },
})
