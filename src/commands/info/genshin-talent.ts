import { MessageEmbed } from "discord.js"
import { Command } from "../../structures/Command"
import genshindb, { CombatTalentDetail } from "genshin-db"

export default new Command({
  name: "genshin-talent",
  description: "Search gensgin impact talent",
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
      ],
      required: true,
    },
    {
      name: "talent-level",
      description: "name of character",
      type: "INTEGER",
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const name = interaction.options.getString("character-name")
    const type = interaction.options.getString("talent-type")
    const level = interaction.options.getInteger("talent-level")

    const data = genshindb.characters(name, { matchAliases: true })
    const talent = genshindb.talents(name)
    if (!data && !talent)
      return interaction.reply({
        content: "Character not found",
        ephemeral: true,
      })

    if (level) {
      if (level < 1 || level > 15)
        return interaction.reply({
          content: "Level must be between 1 and 15",
          ephemeral: true,
        })
    }

    let talentType = {} as CombatTalentDetail
    if (type === "attack") talentType = talent.combat1
    if (type === "elemental") talentType = talent.combat2
    if (type === "burst") talentType = talent.combat3

    const outlabels: string[] = []
    const rx = /{(.*?)}/g
    for (let label of talentType.attributes.labels) {
      const matches = label.matchAll(rx)

      for (const match of matches) {
        const grab = match[1]
        const [paramnum, format] = grab.split(":")

        let value = talentType.attributes.parameters[paramnum][
          level ? level - 1 : 0
        ] as unknown

        if (format === "I") {
          label = label.replace(match[0], value as string)
          continue
        }
        if (format.includes("P")) value = (value as number) * 100

        value = (value as number).toFixed(
          format[1] as unknown as number
        ) as string

        if (format.includes("P")) value = value + "%"
        label = label.replace(match[0], value as string)
      }
      outlabels.push(label)
    }

    const talentAttr = outlabels.map((label) => label.replace("|", ": "))

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
          talentAttr.join("\n"),
      })

    return interaction.reply({
      embeds: [talentEmbed],
    })
  },
})
