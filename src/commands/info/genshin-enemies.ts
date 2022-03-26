import { Command } from "../../structures/Command"
import genshindb from "genshin-db"
import { MessageEmbed } from "discord.js"

export default new Command({
  name: "genshin-enemies",
  description: "Search genshin impact enemies",
  options: [
    {
      name: "name",
      description: "Monster name",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const name = interaction.options.getString("name")
    const data = genshindb.enemies(name)

    if (!data)
      return await interaction.reply({
        content: "Enemy not found!",
        ephemeral: true,
      })

    console.log(data)
    const enemyEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setTitle(data.name)
      .setThumbnail(
        `https://res.cloudinary.com/genshin/image/upload/sprites/${data.images.nameicon}.png`
      )
      .setDescription(data.description)

    return await interaction.reply({ embeds: [enemyEmbed] })
  },
})
