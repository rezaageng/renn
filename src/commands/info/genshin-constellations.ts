import { Command } from "../../structures/Command"
import genshindb from "genshin-db"
import { MessageEmbed } from "discord.js"

export default new Command({
  name: "genshin-constellations",
  description: "Search genshin impact constellations",
  options: [
    {
      name: "character-name",
      description: "the character you want to search the constellation",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const name = interaction.options.getString("character-name").toLowerCase()
    const data = genshindb.characters(
      name.includes("aether") || name.includes("lumine")
        ? name.split(" ")[0]
        : name,
      { matchAliases: true }
    )
    const cons = genshindb.constellations(
      name.includes("aether") || name.includes("lumine")
        ? `traveler ${name.split(" ")[1]}`
        : name
    )

    if (!data || !cons)
      return interaction.reply({
        content:
          "Character constellation not found!\nIf you wanna to search traveler, use aether or lumine instead of traveler, for example: aether anemo",
        ephemeral: true,
      })

    const consEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setThumbnail(data.images.icon)
      .setTitle(data.name)
      .addFields(
        { name: `C1: ${cons.c1.name}`, value: cons.c1.effect },
        { name: `C2: ${cons.c2.name}`, value: cons.c2.effect },
        { name: `C3: ${cons.c3.name}`, value: cons.c3.effect },
        { name: `C4: ${cons.c4.name}`, value: cons.c4.effect },
        { name: `C5: ${cons.c5.name}`, value: cons.c5.effect },
        { name: `C6: ${cons.c6.name}`, value: cons.c6.effect }
      )

    return await interaction.reply({ embeds: [consEmbed] })
  },
})
