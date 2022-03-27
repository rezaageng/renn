import { Command } from "../../structures/Command"
import genshindb from "genshin-db"
import { MessageEmbed } from "discord.js"
import { formatWeaponEffect } from "../../functions/genshin-db"

export default new Command({
  name: "genshin-weapon",
  description: "Search genshin impact weapon",
  options: [
    {
      name: "name",
      description: "weapon name",
      type: "STRING",
      required: true,
    },
    {
      name: "weapon-level",
      description: "fill with weapon level, example: 80 or 80+ for ascend",
      type: "STRING",
      required: false,
    },
    {
      name: "refinement",
      description: "calculate ascension costs",
      type: "INTEGER",
      choices: [
        { name: "Refinement 1", value: 1 },
        { name: "Refinement 2", value: 2 },
        { name: "Refinement 3", value: 3 },
        { name: "Refinement 4", value: 4 },
        { name: "Refinement 5", value: 5 },
      ],
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
    const statsLevel = interaction.options.getString("weapon-level")
    const ascension = interaction.options.getInteger("ascension-costs")
    const refinement = interaction.options.getInteger("refinement")

    const data = genshindb.weapons(name)

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
        content: "Weapon not found!",
        ephemeral: true,
      })

    if (
      (ascension && statsLevel) ||
      (ascension && refinement) ||
      (ascension && statsLevel && refinement)
    )
      return interaction.reply({
        content: "Can't use with ascension",
        ephemeral: true,
      })

    // * ASCENSION
    if (ascension) {
      const weaponAscension = data.costs

      if (!weaponAscension || !Object.keys(weaponAscension)[ascension - 1])
        return interaction.reply({
          content: "Ascension not found",
          ephemeral: true,
        })

      const weaponAscensionEmbed = new MessageEmbed()
        .setColor("#712B75")
        .setThumbnail(data.images.icon)
        .setTitle(data.name)
        .setDescription(`Ascension ${ascension}`)
        .addFields(
          ascension === 1
            ? weaponAscension.ascend1.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : ascension === 2
            ? weaponAscension.ascend2.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : ascension === 3
            ? weaponAscension.ascend3.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : ascension === 4
            ? weaponAscension.ascend4.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : ascension === 5
            ? weaponAscension.ascend5.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : weaponAscension.ascend6.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
        )

      return await interaction.reply({ embeds: [weaponAscensionEmbed] })
    } // * END ASCENSION

    const formatted = formatWeaponEffect(data, refinement ? refinement - 1 : 0)
    const levelAcs = statsLevel ? statsLevel.slice(2) : ""
    const weaponStats = data.stats(
      statsLevel ? (statsLevel.slice(0, 2) as unknown as number) : 1,
      levelAcs ? "+" : "-"
    )

    const characterEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setThumbnail(data.images.icon)
      .setTitle(data.name)
      .setDescription(data.description)
      .addFields(
        { name: "Rarity", value: `:star:  ${data.rarity}`, inline: true },
        { name: "Weapon Type", value: data.weapontype, inline: true },
        {
          name: "Base Attack",
          value: `${weaponStats.attack.toFixed(0)}`,
          inline: true,
        },
        {
          name: data.substat,
          value: `${
            data.substat !== "Elemental Mastery"
              ? (weaponStats.specialized * 100).toFixed(0) + "%"
              : weaponStats.specialized.toFixed(0)
          }`,
        },
        { name: data.effectname, value: formatted }
      )

    return await interaction.reply({ embeds: [characterEmbed] })
  },
})
