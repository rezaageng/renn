import { MessageEmbed } from "discord.js"
import { Command } from "../../structures/Command"

export default new Command({
  name: "ping",
  description: "Ping renn!",
  run: async ({ interaction, client }) => {
    const pingEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setTitle("Pong")

      .addField("Latency", `🏓 ${Date.now() - interaction.createdTimestamp}ms`)
      .addField("API Latency", `🔥 ${Math.round(client.ws.ping)}ms`)
      .setTimestamp()

    return interaction.reply({ embeds: [pingEmbed] })
  },
})
