// import { GenshinKit } from "@genshin-kit/core"
import { createCanvas, loadImage, registerFont } from "canvas"
import { MessageAttachment } from "discord.js"
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
      console.log(data.stats)

      const Avatar = {
        size: 256,
        x: 480,
        y: 100,
      }

      registerFont("./src/assets/fonts/ja-jp.ttf", { family: "Genshin" })

      const canvas = createCanvas(1200, 1280)
      const ctx = canvas.getContext("2d")

      ctx.fillStyle = "#0f172a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const avImg = await loadImage(data.avatars[0].image)
      ctx.save()

      ctx.strokeStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(
        Avatar.x + Avatar.size / 2,
        Avatar.y + Avatar.size / 2,
        Avatar.size / 2,
        0,
        Math.PI * 2,
        true
      )
      ctx.closePath()
      ctx.clip()
      ctx.stroke()

      ctx.drawImage(avImg, Avatar.x, Avatar.y)
      ctx.restore()

      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.font = "32px 'Genshin'"
      ctx.fillText(`UID: ${uid}`, 1200 / 2, 400)

      const attachement = new MessageAttachment(
        canvas.toBuffer(),
        "welcome.png"
      )

      return await interaction.reply({ content: "OK", files: [attachement] })
    } catch (error) {
      console.error(error)
      return await interaction.reply({
        content: error.message,
        ephemeral: true,
      })
    }
  },
})
