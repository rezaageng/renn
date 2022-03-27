import { Command } from "../../structures/Command"
import genshindb from "genshin-db"
import { MessageEmbed } from "discord.js"

export default new Command({
  name: "genshin-enemies",
  description: "Search genshin impact enemies",
  options: [
    {
      name: "name",
      description: "Enemies name",
      type: "STRING",
      required: true,
    },
    {
      name: "level",
      description: "Enemies name",
      type: "INTEGER",
      required: false,
    },
  ],
  run: async ({ interaction }) => {
    const name = interaction.options.getString("name")
    const data = genshindb.enemies(name)
    const level = interaction.options.getInteger("level")

    if (!data)
      return await interaction.reply({
        content: "Enemy not found!",
        ephemeral: true,
      })

    if (level) {
      if (level < 1 || level > 200)
        return interaction.reply({
          content: "Level must be between 1 and 200",
          ephemeral: true,
        })
    }

    const stats = data.stats(level || 100)

    const enemyEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setTitle(data.name)
      .setThumbnail(
        `https://res.cloudinary.com/genshin/image/upload/sprites/${data.images.nameicon}.png`
      )
      .setDescription(data.description)
      .addFields(
        { name: "Category", value: data.category },
        {
          name: "Rewards",
          value:
            data.rewardpreview.map((r) => `${r.name}`).join(", ") || "None",
        },
        { name: "Level", value: `${stats.level}`, inline: true },
        { name: "HP", value: `${stats.hp.toFixed(0)}`, inline: true },
        { name: "Attack", value: `${stats.attack.toFixed(0)}`, inline: true },
        { name: "Defense", value: `${stats.defense.toFixed(0)}`, inline: true }
      )

    return await interaction.reply({ embeds: [enemyEmbed] })
  },
})
