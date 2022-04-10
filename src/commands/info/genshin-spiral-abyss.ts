import { createCanvas, registerFont } from "canvas"
import { MessageAttachment } from "discord.js"
import { Hoyo } from "../.."
import { dateFormat } from "../../functions/genshin-kit"
import { Command } from "../../structures/Command"
import { Phase } from "../../typings/GenshinKit"

export default new Command({
  name: "genshin-spiral-abyss",
  description: "Show spiral abyss history",
  options: [
    {
      name: "uid",
      description: "Genshin Impact UID",
      type: "INTEGER",
      required: true,
    },
    {
      name: "phase",
      description: "Spiral Abyss Phase",
      type: "INTEGER",
      choices: [
        { name: "Current Lunar Phase", value: 1 },
        { name: "Previous Lunar Phase", value: 2 },
      ],
      required: true,
    },
  ],
  run: async ({ interaction }) => {
    const uid = interaction.options.getInteger("uid")
    const phase = interaction.options.getInteger("phase")

    if (
      interaction.channelId !== process.env.COMMANDS_CHANNEL_ID &&
      interaction.channelId !== process.env.DEBUG_CHANNEL_ID
    )
      return await interaction.reply({
        content: `Please use this command in  <#${process.env.COMMANDS_CHANNEL_ID}>`,
        ephemeral: true,
      })

    try {
      const data = await Hoyo.getSpiralAbyss(uid, phase as Phase)
      const date = dateFormat(data.start_time)
      console.log(date)

      await interaction.deferReply()

      // * Canvas
      registerFont("./src/assets/fonts/ja-jp.ttf", { family: "Genshin" })
      const canvas = createCanvas(1200, 1200)
      const ctx = canvas.getContext("2d")

      // * Background
      ctx.fillStyle = "rgb(17, 24, 39)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const attachement = new MessageAttachment(
        canvas.toBuffer(),
        `renn-hoyo-${uid}.png`
      )

      return await interaction.followUp({ files: [attachement] })
    } catch (error) {
      console.error(error.message)

      if (interaction.replied || interaction.deferred)
        return await interaction.followUp({
          content:
            "Something wrong when trying generate image!\nPlease try again later.",
        })

      return await interaction.reply({
        content:
          "Invalid UID or the data is not public!\nClick [here](https://www.hoyolab.com/setting/privacy) to change your Battle Chronicle privacy settings.",
        ephemeral: true,
      })
    }
  },
})
