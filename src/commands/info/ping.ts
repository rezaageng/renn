import { MessageEmbed } from "discord.js"
import { Command } from "../../structures/Command"

export default new Command({
  name: "ping",
  description: "Ping renn!",
  run: async ({ interaction, client }) => {
    if (
      interaction.channelId !== process.env.COMMANDS_CHANNEL_ID &&
      interaction.channelId !== process.env.DEBUG_CHANNEL_ID
    )
      return await interaction.reply({
        content: `Please use this command in  <#${process.env.COMMANDS_CHANNEL_ID}>`,
        ephemeral: true,
      })

    const pingEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setTitle("Pong")

      .addField("Latency", `🏓 ${Date.now() - interaction.createdTimestamp}ms`)
      .addField("API Latency", `🔥 ${Math.round(client.ws.ping)}ms`)
      .setTimestamp()

    return interaction.reply({ embeds: [pingEmbed] })
  },
})
