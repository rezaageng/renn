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
      description: "character name",
      type: "STRING",
      required: true,
    },
    {
      name: "character-level",
      description: "fill with character level",
      type: "INTEGER",
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const category = interaction.options.getString("category")
    const name = interaction.options.getString("name")
    const statsLevel = interaction.options.getInteger("character-level")

    if (category === "character") {
      const data = genshindb.characters(name)

      if (!data)
        return interaction.reply({
          content: "Character not found",
          ephemeral: true,
        })

      if (statsLevel) {
        const charaStats = data.stats(statsLevel)

        if (!charaStats)
          return interaction.reply({
            content: "Please enter a valid level",
            ephemeral: true,
          })

        const charaStatsEmbed = new MessageEmbed()
          .setColor("#712B75")
          .setThumbnail(data.images.icon)
          .setTitle(data.name)
          .addFields(
            { name: "Level", value: `${charaStats.level}`, inline: true },
            {
              name: "Ascension",
              value: `${charaStats.ascension}`,
              inline: true,
            },
            { name: "HP", value: `${Math.round(charaStats.hp)}`, inline: true },
            {
              name: "Attack",
              value: `${Math.round(charaStats.attack)}`,
              inline: true,
            },
            {
              name: "Defense",
              value: `${Math.round(charaStats.defense)}`,
              inline: true,
            },
            {
              name: `${data.substat}`,
              value: `${
                data.substat !== "Elemental Mastery"
                  ? Math.round(charaStats.specialized * 100) + "%"
                  : Math.round(charaStats.specialized)
              }`,
            }
          )

        return await interaction.reply({ embeds: [charaStatsEmbed] })
      }

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

      console.log(data.costs)

      return await interaction.reply({ embeds: [characterEmbed] })
    }

    return interaction.reply("ok")
  },
})
