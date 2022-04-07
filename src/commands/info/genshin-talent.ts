import { MessageEmbed } from "discord.js"
import { Command } from "../../structures/Command"
import genshindb, { CombatTalentDetail } from "genshin-db"
import { ExtendedPassiveTalentDetail } from "../../typings/GenshinDb"
import { talentLabelFormat } from "../../functions/genshin-db"

export default new Command({
  name: "genshin-talent",
  description: "Search genshin impact talent",
  options: [
    {
      name: "character-name",
      description: "name of character",
      type: "STRING",
      required: true,
    },
    {
      name: "talent-type",
      description: "talent type",
      type: "STRING",
      choices: [
        { name: "Normal Attack", value: "attack" },
        { name: "Elemental Skill", value: "elemental" },
        { name: "Elemental Burst", value: "burst" },
        { name: "Passive Skill 1", value: "passive1" },
        { name: "Passive Skill 2", value: "passive2" },
        { name: "Passive Skill 3", value: "passive3" },
        { name: "Passive Skill 4", value: "passive4" },
        { name: "Special", value: "special" },
      ],
      required: true,
    },
    {
      name: "talent-level",
      description: "name of character",
      type: "INTEGER",
      required: false,
    },
    {
      name: "talent-costs",
      description: "name of character",
      type: "INTEGER",
      choices: [
        { name: "Level 2", value: 2 },
        { name: "Level 3", value: 3 },
        { name: "Level 4", value: 4 },
        { name: "Level 5", value: 5 },
        { name: "Level 6", value: 6 },
        { name: "Level 7", value: 7 },
        { name: "Level 8", value: 8 },
        { name: "Level 9", value: 9 },
        { name: "Level 10", value: 10 },
      ],
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const name = interaction.options.getString("character-name")
    const type = interaction.options.getString("talent-type")
    const level = interaction.options.getInteger("talent-level")
    const talentCosts = interaction.options.getInteger("talent-costs")

    const data = genshindb.characters(name, { matchAliases: true })
    const talent = genshindb.talents(
      name.includes("aether") || name.includes("lumine") ? "traveler" : name
    )

    if (
      interaction.channelId !== process.env.COMMANDS_CHANNEL_ID &&
      interaction.channelId !== process.env.DEBUG_CHANNEL_ID
    )
      return await interaction.reply({
        content: `Please use this command in  <#${process.env.COMMANDS_CHANNEL_ID}>`,
        ephemeral: true,
      })

    if (!data || !talent)
      return interaction.reply({
        content:
          "Character talent not found!\nIf you wanna to search traveler, use aether or lumine instead of traveler",
        ephemeral: true,
      })

    if (level) {
      if (level < 1 || level > 15)
        return interaction.reply({
          content: "Level must be between 1 and 15",
          ephemeral: true,
        })
    }

    if (
      (level && type === "special") ||
      (level && type.includes("passive")) ||
      (level && talentCosts)
    )
      return await interaction.reply({
        content: "Level not needed for talent costs, passive, and special",
        ephemeral: true,
      })

    // * TALENT COSTS
    if (
      (talentCosts && type === "special") ||
      (talentCosts && type.includes("passive"))
    )
      return await interaction.reply({
        content: "This talent type does't need costs",
        ephemeral: true,
      })

    if (talentCosts) {
      const costs = talent.costs
      if (!costs)
        return interaction.reply({ content: "No costs found", ephemeral: true })

      const talentCostsEmbed = new MessageEmbed()
        .setColor("#712B75")
        .setThumbnail(data.images.icon)
        .setTitle(data.name)
        .setDescription(`Level ${talentCosts}`)
        .addFields(
          talentCosts === 2
            ? costs.lvl2.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : talentCosts === 3
            ? costs.lvl3.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : talentCosts === 4
            ? costs.lvl4.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : talentCosts === 5
            ? costs.lvl5.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : talentCosts === 5
            ? costs.lvl5.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : talentCosts === 6
            ? costs.lvl6.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : talentCosts === 7
            ? costs.lvl7.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : talentCosts === 8
            ? costs.lvl8.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : talentCosts === 9
            ? costs.lvl9.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
            : costs.lvl10.map((cost) => ({
                name: cost.name,
                value: `${cost.count}`,
                inline: true,
              }))
        )

      return await interaction.reply({ embeds: [talentCostsEmbed] })
    } // * END TALENT COSTS

    // * PASSIVE TALENTS
    if (type.includes("passive")) {
      let talentPassive = { empty: true } as ExtendedPassiveTalentDetail
      if (type === "passive1") talentPassive = talent.passive1
      if (type === "passive2") talentPassive = talent.passive2
      if (type === "passive3") talentPassive = talent.passive3
      if (type === "passive4") talentPassive = talent.passive4

      if (!talentPassive || talentPassive.empty)
        return await interaction.reply({
          content: "Passive not found",
          ephemeral: true,
        })

      if (talentPassive && !talentPassive.empty) {
        const passiveEmbed = new MessageEmbed()
          .setColor("#712B75")
          .setThumbnail(data.images.icon)
          .setTitle(data.name)
          .addFields({
            name: talentPassive.name,
            value: `${talentPassive.info || "No description"}`,
          })

        return await interaction.reply({ embeds: [passiveEmbed] })
      }
    } // * END PASSIVE TALENTS

    // * COMBAT TALENTS
    let talentType = {} as CombatTalentDetail
    if (type === "attack") talentType = talent.combat1
    if (type === "elemental") talentType = talent.combat2
    if (type === "burst") talentType = talent.combat3
    if (type === "special") talentType = talent.combatsp

    if (!talentType)
      return interaction.reply({ content: "Talent not found", ephemeral: true })

    const talentAttr = talentLabelFormat(talentType.attributes, level)

    const talentEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setThumbnail(data.images.icon)
      .setTitle(data.name)
      .addFields({
        name: talentType.name,
        value:
          `${talentType.description || "No description"}` +
          "\n\n" +
          talentType.info +
          "\n\n" +
          talentAttr,
      })

    return interaction.reply({
      embeds: [talentEmbed],
    })
  },
})
