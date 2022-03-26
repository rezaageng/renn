import { Command } from "../../structures/Command"
import genshindb, { Material } from "genshin-db"
import { MessageEmbed } from "discord.js"

export default new Command({
  name: "genshin-material",
  description: "Search genshin impact material",
  options: [
    {
      name: "type",
      description: "type of material",
      type: "STRING",
      choices: [
        { name: "Specific Materials", value: "materials" },
        { name: "Days or Categories", value: "categories" },
      ],
      required: true,
    },
    {
      name: "name",
      description: "name of materials or days",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const type = interaction.options.getString("type")
    const name = interaction.options.getString("name")
    let data = {} as Material | string[]

    if (type === "materials") {
      data = genshindb.materials(name)

      if (!data)
        return interaction.reply({
          content: "Material not found",
          ephemeral: true,
        })

      const materialEmbed = new MessageEmbed()
        .setColor("#712B75")
        .setThumbnail(data.images.redirect)
        .setTitle(data.name)
        .setDescription(data.description)
        .addFields(
          {
            name: "Rarity",
            value: `:star: ${data.rarity ? data.rarity : "-"}`,
          },
          { name: "Category", value: data.materialtype },
          { name: "Source", value: data.source.map((s) => s).join(", ") },
          {
            name: "Domain",
            value: `${data.dropdomain ? data.dropdomain : "-"}`,
          },
          {
            name: "Days of week",
            value: `${
              data.daysofweek ? data.daysofweek.map((d) => d).join(", ") : "-"
            }`,
          }
        )

      return await interaction.reply({ embeds: [materialEmbed] })
    }

    if (type === "categories") {
      data = genshindb.materials(name, { matchCategories: true }) as string[]

      if (!data || !(data instanceof Array))
        return interaction.reply({
          content: "Category not found",
          ephemeral: true,
        })

      const categoryEmbed = new MessageEmbed()
        .setColor("#712B75")
        .setTitle(`Category: ${name}`)
        .setDescription(data.map((d, i) => `${i + 1}. ${d}`).join("\n"))

      return await interaction.reply({ embeds: [categoryEmbed] })
    }

    return interaction.reply({ content: "Something wrong", ephemeral: true })
  },
})
