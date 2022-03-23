import { CommandInteractionOptionResolver } from "discord.js"
import { client } from ".."
import { Event } from "../structures/Event"
import { ExtendedInteraction } from "../typings/Command"

export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName)
    if (!command) return interaction.reply("Command not found")

    command.run({
      args: interaction.options as CommandInteractionOptionResolver,
      client,
      interaction: interaction as ExtendedInteraction,
    })
  }

  if (interaction.isButton()) {
    const [name, action, user] = interaction.customId.split("-")
    const button = client.buttons.get(name)
    if (!button) return interaction.reply("Button not found")

    console.log(action, user)

    button.run({
      client,
      interaction: interaction,
      action,
      user,
    })
  }
})
