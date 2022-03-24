import { CommandInteractionOptionResolver } from "discord.js"
import { client } from ".."
import { Event } from "../structures/Event"
import { ExtendedInteraction } from "../typings/Command"

export default new Event("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const command = client.commands.get(interaction.commandName)
    if (!command) return interaction.reply("Command not found")

    if (
      process.env.DEBUG_MODE &&
      interaction.channelId !== process.env.DEBUG_CHANNEL_ID
    )
      return interaction.reply({
        content: "You cannot use bots in development!",
        ephemeral: true,
      })

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

    button.run({
      client,
      interaction,
      action,
      user,
    })
  }
})
