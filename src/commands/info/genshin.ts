import { Command } from "../../structures/Command"
import genshindb from "genshin-db"
import { MessageEmbed } from "discord.js"

export default new Command({
  name: "genshin",
  description: "Genshin Impact database",
  options: [
    {
      name: "category",
      description: "select category",
      type: "STRING",
      choices: [
        {
          name: "character",
          value: "character",
        },
      ],
      required: true,
    },
    {
      name: "name",
      description: "search",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const category = interaction.options.getString("category")
    const name = interaction.options.getString("name")

    if (category === "character") {
      const data = genshindb.characters(name)

      if (!data)
        return interaction.reply({
          content: "Character not found",
          ephemeral: true,
        })

      const characterEmbed = new MessageEmbed()
        .setColor("#712B75")
        .setThumbnail(data.images.icon)
        .setTitle(data.name)
        .setDescription(data.description)
        .addFields(
          { name: "Title", value: data.title, inline: true },
          { name: "Element", value: data.element, inline: true },
          { name: "Weapon", value: data.weapontype, inline: true },
          { name: "Substat", value: data.substat, inline: true },
          { name: "Gender", value: data.gender, inline: true },
          { name: "Body", value: data.body, inline: true },
          { name: "Association", value: data.association, inline: true },
          { name: "Region", value: data.region, inline: true },
          { name: "Affiliation", value: data.affiliation, inline: true },
          { name: "Birthday", value: data.birthday, inline: true },
          { name: "Constellation", value: data.constellation, inline: true },
          { name: "English VA", value: data.cv.english, inline: true },
          { name: "Japanese VA", value: data.cv.japanese, inline: true },
          { name: "Chinese VA", value: data.cv.chinese, inline: true },
          { name: "Korean VA", value: data.cv.korean, inline: true }
        )

      return await interaction.reply({ embeds: [characterEmbed] })
    }

    return interaction.reply("ok")
  },
})
