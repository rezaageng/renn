import { Command } from "../../structures/Command"
import genshindb from "genshin-db"
import { MessageEmbed } from "discord.js"

export default new Command({
  name: "genshin-character",
  description: "Genshin Impact database",
  options: [
    {
      name: "name",
      description: "character name",
      type: "STRING",
      required: true,
    },
    {
      name: "character-level",
      description: "fill with character level, example: 80 or 80+ for ascend",
      type: "STRING",
      required: false,
    },
    {
      name: "ascension-costs",
      description: "calculate ascension costs",
      type: "INTEGER",
      choices: [
        { name: "Ascension 1", value: 1 },
        { name: "Ascension 2", value: 2 },
        { name: "Ascension 3", value: 3 },
        { name: "Ascension 4", value: 4 },
        { name: "Ascension 5", value: 5 },
        { name: "Ascension 6", value: 6 },
      ],
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const name = interaction.options.getString("name")
    const statsLevel = interaction.options.getString("character-level")
    const ascension = interaction.options.getInteger("ascension-costs")

    const data = genshindb.characters(name, { matchAliases: true })

    if (
      interaction.channelId !== process.env.COMMANDS_CHANNEL_ID &&
      interaction.channelId !== process.env.DEBUG_CHANNEL_ID
    )
      return await interaction.reply({
        content: `Please use this command in  <#${process.env.COMMANDS_CHANNEL_ID}>`,
        ephemeral: true,
      })

    if (!data)
      return interaction.reply({
        content:
          "Character not found!\nIf you wanna to search traveler, use aether or lumine instead of traveler",
        ephemeral: true,
      })

    if (statsLevel && ascension)
      return interaction.reply({
        content: "You can't use both",
        ephemeral: true,
      })

    if (statsLevel) {
      const levelAcs = statsLevel.slice(2)
      const charaStats = data.stats(
        statsLevel.slice(0, 2) as unknown as number,
        levelAcs ? "+" : "-"
      )

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
          {
            name: "Level",
            value: `${charaStats.level}`,
            inline: true,
          },
          {
            name: "Ascension",
            value: `${charaStats.ascension}`,
            inline: true,
          },
          {
            name: "HP",
            value: `${Math.round(charaStats.hp)}`,
            inline: true,
          },
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

    if (ascension) {
      const charaAscension = data.costs

      if (!charaAscension) {
        return interaction.reply({
          content: "ascension not found",
          ephemeral: true,
        })
      }

      const charaascensionEmbed = new MessageEmbed()
        .setColor("#712B75")
        .setThumbnail(data.images.icon)
        .setTitle(data.name)
        .setDescription(`Ascension ${ascension}`)
        .addFields(
          ascension === 1
            ? charaAscension.ascend1.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : ascension === 2
            ? charaAscension.ascend2.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : ascension === 3
            ? charaAscension.ascend3.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : ascension === 4
            ? charaAscension.ascend4.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : ascension === 5
            ? charaAscension.ascend5.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : charaAscension.ascend6.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
        )

      return await interaction.reply({ embeds: [charaascensionEmbed] })
    }

    const characterEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setThumbnail(data.images.icon)
      .setTitle(data.name)
      .setDescription(data.description)
      .addFields(
        { name: "Title", value: data.title || "?", inline: true },
        { name: "Element", value: data.element, inline: true },
        { name: "Weapon", value: data.weapontype, inline: true },
        { name: "Substat", value: data.substat, inline: true },
        { name: "Gender", value: data.gender, inline: true },
        { name: "Body", value: data.body, inline: true },
        {
          name: "Association",
          value: data.association || "?",
          inline: true,
        },
        { name: "Region", value: data.region || "?", inline: true },
        {
          name: "Affiliation",
          value: data.affiliation || "?",
          inline: true,
        },
        { name: "Birthday", value: data.birthday || "?", inline: true },
        {
          name: "Constellation",
          value: data.constellation,
          inline: true,
        },
        { name: "English VA", value: data.cv.english, inline: true },
        { name: "Japanese VA", value: data.cv.japanese, inline: true },
        { name: "Chinese VA", value: data.cv.chinese, inline: true },
        { name: "Korean VA", value: data.cv.korean, inline: true }
      )

    return await interaction.reply({ embeds: [characterEmbed] })
  },
})
