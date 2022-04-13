import { createCanvas, loadImage, registerFont } from "canvas"
import { MessageAttachment } from "discord.js"
import { Hoyo } from "../.."
import { dateFormat, resizeImg } from "../../functions/genshin-kit"
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

      if (!data.is_unlock)
        return await interaction.reply({
          content: "Spiral Abyss not unlocked",
          ephemeral: true,
        })

      await interaction.deferReply()

      console.log(data)

      // * Canvas
      registerFont("./src/assets/fonts/ja-jp.ttf", { family: "Genshin" })
      const canvas = createCanvas(1200, 1200)
      const ctx = canvas.getContext("2d")

      // * Background
      ctx.fillStyle = "rgb(17, 24, 39)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // * Head
      ctx.fillStyle = "#ffffff"
      ctx.font = "26px Genshin"
      ctx.textAlign = "center"
      ctx.fillText("Challenge Summary", canvas.width / 2, 96)
      ctx.fillText("Most Played Characters", canvas.width / 2, 212)

      // * Summary
      ctx.fillStyle = "rgb(31, 41, 55)"
      ctx.fillRect(0, 116, canvas.width, 48)
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.font = "16px 'Genshin'"
      ctx.fillText(
        `Period: ${dateFormat(data.start_time)}-${dateFormat(
          data.end_time
        )}     Deepest Descent: ${data.max_floor}     Battles Fought: ${
          data.total_battle_times
        }     Stars: ${data.total_star}`,
        canvas.width / 2,
        146
      )

      // * Characters
      const charaImg = await Promise.all(
        data.reveal_rank.map(async (c) => await loadImage(c.avatar_icon))
      )
      data.reveal_rank.forEach((character, i) => {
        ctx.fillStyle = "#312e81"
        ctx.fillRect(376 + i * 116, 318, 100, 30)

        ctx.fillStyle = "rgb(31, 41, 55)"
        ctx.fillRect(376 + i * 116, 228, 100, 100)

        resizeImg(ctx, charaImg[i], 376 + i * 116, 228, 0.39)

        ctx.fillStyle = "#ffffff"
        ctx.textAlign = "center"
        ctx.font = "16px 'Genshin'"
        ctx.fillText(`${character.value}`, 376 + i * 116 + 50, 343)
      })

      // * Stats
      ctx.fillStyle = "rgb(31, 41, 55)"
      ctx.fillRect(0, 376, canvas.width, 48)

      const attachement = new MessageAttachment(
        canvas.toBuffer(),
        `renn-abyss-${uid}.png`
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
