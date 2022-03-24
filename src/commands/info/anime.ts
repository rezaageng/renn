import { MessageEmbed } from "discord.js"
import { getAnime, getGenres } from "../../api/kitsu"
import { Command } from "../../structures/Command"

export default new Command({
  name: "anime",
  description: "search anime",
  options: [
    {
      name: "search",
      description: "search anime",
      type: "STRING",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const search = interaction.options.getString("search")
    const anime = await getAnime(search)

    if (
      interaction.channelId !== process.env.COMMANDS_CHANNEL_ID &&
      interaction.channelId !== process.env.DEBUG_CHANNEL_ID
    )
      return await interaction.reply({
        content: `Please use this command in  <#${process.env.COMMANDS_CHANNEL_ID}>`,
        ephemeral: true,
      })

    if (!anime)
      return await interaction.reply({
        content: "Anime not found",
        ephemeral: true,
      })

    const genres = await getGenres(anime.relationships.genres.links.related)
    const animeEmbed = new MessageEmbed()
      .setColor("#712B75")
      .setTitle(
        anime.attributes.titles.en_jp || anime.attributes.canonicalTitle
      )
      .setURL(`https://kitsu.io/anime/${anime.id}`)
      .setDescription(anime.attributes.synopsis)
      .setThumbnail(anime.attributes.posterImage.small)
      .addFields(
        {
          name: ":star: Rating",
          value: `${anime.attributes.averageRating || "?"} / 100`,
          inline: true,
        },
        {
          name: ":trophy: Rank",
          value: `#${anime.attributes.ratingRank || "?"}`,
          inline: true,
        },
        {
          name: ":performing_arts: Genres",
          value: `${genres.join(", ")}`,
          inline: false,
        },
        {
          name: ":hourglass_flowing_sand: Status",
          value: `${anime.attributes.status || "?"}`,
          inline: true,
        },
        {
          name: ":tv: Type",
          value: `${anime.attributes.subtype || "?"}`,
          inline: true,
        },
        {
          name: ":calendar_spiral: Aired",
          value: `from ${anime.attributes.startDate || "?"} to ${
            anime.attributes.endDate || "?"
          }`,
          inline: false,
        },
        {
          name: ":film_frames: Total Episodes",
          value: `${anime.attributes.episodeCount || "?"} episodes`,
          inline: true,
        },
        {
          name: ":film_frames: Duration",
          value: `${
            anime.attributes.episodeLength || "?"
          } minutes per episodes`,
          inline: true,
        }
      )

    return await interaction.reply({ embeds: [animeEmbed] })
  },
})
