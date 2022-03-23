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
    const button = client.buttons.get(interaction.customId)
    console.log(button)
    if (!button) return interaction.reply("Button not found")

    button.run({
      client,
      interaction: interaction,
    })
  }
})
