import { MessageEmbed } from "discord.js"
import { getGenres, getManga } from "../../api/kitsu"
import { Command } from "../../structures/Command"

export default new Command({
  name: "manga",
  description: "search manga",
  options: [
    {
      name: "search",
      description: "search manga",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const search = interaction.options.getString("search")
    const manga = await getManga(search)
    const genres = await getGenres(manga.relationships.genres.links.related)

    if (
      interaction.channelId !== process.env.COMMANDS_CHANNEL_ID &&
      interaction.channelId !== process.env.DEBUG_CHANNEL_ID
    )
      return await interaction.reply({
        content: `Please use this command in  <#${process.env.COMMANDS_CHANNEL_ID}>`,
        ephemeral: true,
      })

    if (!manga)
      return await interaction.reply({
        content: "manga not found",
        ephemeral: true,
      })

    console.log(manga)
    const mangaEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setTitle(
        manga.attributes.titles.en_jp || manga.attributes.canonicalTitle
      )
      .setURL(`https://kitsu.io/manga/${manga.id}`)
      .setDescription(manga.attributes.synopsis)
      .setThumbnail(manga.attributes.posterImage.small)
      .addFields(
        {
          name: ":star: Rating",
          value: `${manga.attributes.averageRating} / 100`,
          inline: true,
        },
        {
          name: ":trophy: Rank",
          value: `#${manga.attributes.ratingRank}`,
          inline: true,
        },
        {
          name: ":performing_arts: Genres",
          value: `${genres.join(", ")}`,
          inline: false,
        },
        {
          name: ":hourglass_flowing_sand: Status",
          value: `${manga.attributes.status}`,
          inline: true,
        },
        {
          name: ":book: Type",
          value: `${manga.attributes.subtype}`,
          inline: true,
        },
        {
          name: ":calendar_spiral: Published",
          value: `from ${manga.attributes.startDate} to ${manga.attributes.endDate}`,
          inline: false,
        },
        {
          name: ":newspaper:  Chapters",
          value: `${manga.attributes.chapterCount} chs`,
          inline: true,
        },
        {
          name: ":books: Volumes",
          value: `${manga.attributes.volumeCount} vols`,
          inline: true,
        }
      )

    return await interaction.reply({ embeds: [mangaEmbed] })
  },
})
