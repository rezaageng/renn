import { Command } from "../../structures/Command"
import genshindb from "genshin-db"
import { MessageEmbed } from "discord.js"

export default new Command({
  name: "genshin-artifact",
  description: "Search genshin impact artifacts",
  options: [
    {
      name: "name",
      description: "The name of the user to get the genshin artifact for.",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const name = interaction.options.getString("name")
    const data = genshindb.artifacts(name)

    if (!data)
      return await interaction.reply({
        content: "Artfiact not found!",
        ephemeral: true,
      })

    const artifactEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setThumbnail(data.images.flower || data.images.circlet)
      .setTitle(data.name)
      .addFields(
        {
          name: "Rarity",
          value: data.rarity.map((r) => ":star:" + r).join(", "),
        },
        { name: "1-Piece Bonus", value: data["1pc"] || "No Set bonus" },
        { name: "2-Piece Bonus", value: data["2pc"] || "No Set Bonus" },
        { name: "4-Piece Bonus", value: data["4pc"] || "No Set Bonus" }
      )

    return await interaction.reply({ embeds: [artifactEmbed] })
  },
})
