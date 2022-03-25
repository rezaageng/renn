import { MessageEmbed } from "discord.js"
import { Command } from "../../structures/Command"
import genshindb from "genshin-db"

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
  ],
  run: async ({ interaction }) => {
    const name = interaction.options.getString("character-name")

    const data = genshindb.characters(name, { matchAliases: true })
    const talent = genshindb.talents(name)
    if (!data)
      return interaction.reply({
        content: "Character not found",
        ephemeral: true,
      })

    const outlabels: string[] = []
    const rx = /{(.*?)}/g
    for (let label of talent.combat1.attributes.labels) {
      const matches = label.matchAll(rx)

      for (const match of matches) {
        const grab = match[1]
        const [paramnum] = grab.split(":")
        console.log(paramnum)

        const value =
          talent.combat1.attributes.parameters[paramnum][1 - 1] * 100

        const finalValue =
          value > 1000 ? `${value / 100}` : value.toFixed(1) + "%"

        console.log(value)

        label = label.replace(match[0], finalValue)
      }
      outlabels.push(label)
    }

    const talentAttr = outlabels.map((label) => label.replace("|", ": "))
    // console.log(talentAttr)

    const talentEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setThumbnail(data.images.icon)
      .setTitle(data.name)
      .addFields({
        name: talent.combat1.name,
        value:
          talent.combat1.description ||
          "No description" +
            "\n\n" +
            talent.combat1.info +
            "\n\n" +
            talentAttr.join("\n"),
      })

    return interaction.reply({
      embeds: [talentEmbed],
    })
  },
})
