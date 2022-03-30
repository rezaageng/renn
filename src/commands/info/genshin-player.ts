// import { GenshinKit } from "@genshin-kit/core"
import { Hoyo } from "../../functions/genshin-kit"
import { Command } from "../../structures/Command"

export default new Command({
  name: "genshin-player",
  description: "Search Genshin Impact Player by uid",
  options: [
    {
      name: "uid",
      description: "Genshin Impact UID",
      type: "INTEGER",
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const uid = interaction.options.getInteger("uid")

    try {
      const data = await Hoyo.getUserInfo(uid)
      console.log(data.world_explorations)
      return await interaction.reply({ content: "OK" })
    } catch (error) {
      console.error(error)
      return await interaction.reply({
        content: error.message,
        ephemeral: true,
      })
    }
  },
})
