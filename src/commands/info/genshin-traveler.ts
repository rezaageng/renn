import { createCanvas, Image, loadImage, registerFont } from "canvas"
import { MessageAttachment } from "discord.js"
import { Hoyo } from "../../functions/genshin-kit"
import { Command } from "../../structures/Command"
import { ExtendedCharacter, ExtendedUserStats } from "../../typings/GenshinKit"

export default new Command({
  name: "genshin-traveler",
  description: "Search Genshin Impact Traveler by uid",
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
      const stats = data.stats as ExtendedUserStats
      const world = data.world_explorations
      const chara = data.avatars.slice(0, 20) as ExtendedCharacter[]

      await interaction.deferReply()

      const Avatar = {
        size: 256,
        x: 480,
        y: 100,
      }

      registerFont("./src/assets/fonts/ja-jp.ttf", { family: "Genshin" })

      const canvas = createCanvas(
        1200,
        chara.length > 15
          ? 1940
          : chara.length > 10 && chara.length <= 15
          ? 1750
          : chara.length > 5 && chara.length <= 10
          ? 1500
          : 1280
      )
      const ctx = canvas.getContext("2d")
      // * Background
      ctx.fillStyle = "rgb(17, 24, 39)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // * Avatar
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

      // * UID
      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.font = "32px 'Genshin'"
      ctx.fillText(`UID: ${uid}`, 1200 / 2, 400)

      // * Stats
      ctx.fillStyle = "rgb(31, 41, 55)"
      ctx.fillRect(50, 426, 1100, 270)
      ctx.strokeStyle = "#ffffff"
      ctx.beginPath()
      ctx.moveTo(50, 426)
      ctx.lineTo(1150, 426)
      ctx.lineTo(1150, 696)
      ctx.lineTo(50, 696)
      ctx.lineTo(50, 426)
      ctx.stroke()
      ctx.closePath()

      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.font = "26px 'Genshin'"
      ctx.fillText(`${stats.active_day_number}`, 160, 480)
      ctx.fillText(`${stats.achievement_number}`, 380, 480)
      ctx.fillText(`${stats.avatar_number}`, 600, 480)
      ctx.fillText(`${stats.way_point_number}`, 820, 480)
      ctx.fillText(`${stats.anemoculus_number}`, 1040, 480)
      ctx.fillText(`${stats.geoculus_number}`, 160, 550)
      ctx.fillText(`${stats.electroculus_number}`, 380, 550)
      ctx.fillText(`${stats.domain_number}`, 600, 550)
      ctx.fillText(`${stats.spiral_abyss}`, 820, 550)
      ctx.fillText(`${stats.luxurious_chest_number}`, 1040, 550)
      ctx.fillText(`${stats.precious_chest_number}`, 160, 620)
      ctx.fillText(`${stats.exquisite_chest_number}`, 380, 620)
      ctx.fillText(`${stats.common_chest_number}`, 600, 620)
      ctx.fillText(`${stats.magic_chest_number}`, 820, 620)
      ctx.fillText(`${stats.magic_chest_number}`, 820, 620)

      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.font = "16px 'Genshin'"
      ctx.fillText("Days Active", 160, 500)
      ctx.fillText("Achievements", 380, 500)
      ctx.fillText("Characters", 600, 500)
      ctx.fillText("Waypoints Unlocked", 820, 500)
      ctx.fillText("Anemoculi", 1040, 500)
      ctx.fillText("Geoculi", 160, 570)
      ctx.fillText("Electroculi", 380, 570)
      ctx.fillText("Domains Unlocked", 600, 570)
      ctx.fillText("Spiral Abyss", 820, 570)
      ctx.fillText("Luxurious Chests", 1040, 570)
      ctx.fillText("Opened", 1040, 590)
      ctx.fillText("Precious Chests", 160, 640)
      ctx.fillText("Opened", 160, 660)
      ctx.fillText("Exquisite Chests", 380, 640)
      ctx.fillText("Opened", 380, 660)
      ctx.fillText("Common Chests", 600, 640)
      ctx.fillText("Opened", 600, 660)
      ctx.fillText("Remarkable Chests", 820, 640)
      ctx.fillText("Opened", 820, 660)

      // * World Explorations
      ctx.fillStyle = "rgb(31, 41, 55)"
      ctx.fillRect(50, 722, 1100, 270)
      ctx.strokeStyle = "#ffffff"
      ctx.beginPath()
      ctx.moveTo(50, 722)
      ctx.lineTo(1150, 722)
      ctx.lineTo(1150, 992)
      ctx.lineTo(50, 992)
      ctx.lineTo(50, 722)
      ctx.stroke()
      ctx.closePath()

      const worldImg = await Promise.all(
        world.map(async (w) => await loadImage(w.icon))
      )

      const resizeImg = (img: Image, x: number, y: number, scale: number) => {
        ctx.save()
        ctx.translate(x, y)
        ctx.scale(scale, scale)
        ctx.drawImage(img, 0, 0)
        ctx.restore()
      }

      resizeImg(worldImg[0], 95, 756, 0.5)
      resizeImg(worldImg[1], 310, 752, 0.75)
      resizeImg(worldImg[2], 525, 752, 0.8)
      resizeImg(worldImg[3], 745, 756, 0.58)
      resizeImg(worldImg[4], 975, 756, 0.5)

      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.font = "24px 'Genshin'"
      ctx.fillText("Enkanomiya", 160, 912)
      ctx.fillText("Inazuma", 380, 912)
      ctx.fillText("Dragonspine", 600, 912)
      ctx.fillText("Liyue", 820, 912)
      ctx.fillText("Mondstadt", 1040, 912)

      ctx.fillStyle = "#ffffff"
      ctx.textAlign = "center"
      ctx.font = "16px 'Genshin'"
      ctx.fillText(`${world[0].exploration_percentage / 10}%`, 160, 942)
      ctx.fillText(`${world[1].exploration_percentage / 10}%`, 380, 942)
      ctx.fillText(`${world[2].exploration_percentage / 10}%`, 600, 942)
      ctx.fillText(`${world[3].exploration_percentage / 10}%`, 820, 942)
      ctx.fillText(`${world[4].exploration_percentage / 10}%`, 1040, 942)

      // * Characters
      const charaImg1 = await Promise.all(
        chara.slice(0, 5).map(async (c) => await loadImage(c.image))
      )

      const charaImg2 = await Promise.all(
        chara.slice(5, 10).map(async (c) => await loadImage(c.image))
      )
      const charaImg3 = await Promise.all(
        chara.slice(10, 15).map(async (c) => await loadImage(c.image))
      )
      const charaImg4 = await Promise.all(
        chara.slice(15, 20).map(async (c) => await loadImage(c.image))
      )

      charaImg1.length !== 0 &&
        charaImg1.forEach((img, i) => {
          ctx.fillStyle = "#312e81"
          ctx.fillRect(50 + i * 225, 1200, 200, 70)

          ctx.fillStyle = "rgb(31, 41, 55)"
          ctx.fillRect(50 + i * 225, 1020, 200, 200)

          resizeImg(img, 50 + i * 225, 1020, 0.78)

          ctx.strokeStyle = "#ffffff"
          ctx.beginPath()
          ctx.moveTo(50 + i * 225, 1020)
          ctx.lineTo(50 + i * 225 + 200, 1020)
          ctx.lineTo(50 + i * 225 + 200, 1270)
          ctx.lineTo(50 + i * 225, 1270)
          ctx.lineTo(50 + i * 225, 1020)
          ctx.stroke()
          ctx.closePath()

          ctx.fillStyle = "#ffffff"
          ctx.textAlign = "center"
          ctx.font = "24px 'Genshin'"
          ctx.fillText(`Lv. ${chara[i].level}`, 50 + i * 225 + 100, 1254)
        })
      charaImg2.length !== 0 &&
        charaImg2.forEach((img, i) => {
          ctx.fillStyle = "#312e81"
          ctx.fillRect(50 + i * 225, 1480, 200, 70)

          ctx.fillStyle = "rgb(31, 41, 55)"
          ctx.fillRect(50 + i * 225, 1300, 200, 200)

          resizeImg(img, 50 + i * 225, 1300, 0.78)

          ctx.strokeStyle = "#ffffff"
          ctx.beginPath()
          ctx.moveTo(50 + i * 225, 1300)
          ctx.lineTo(50 + i * 225 + 200, 1300)
          ctx.lineTo(50 + i * 225 + 200, 1550)
          ctx.lineTo(50 + i * 225, 1550)
          ctx.lineTo(50 + i * 225, 1300)
          ctx.stroke()
          ctx.closePath()

          ctx.fillStyle = "#ffffff"
          ctx.textAlign = "center"
          ctx.font = "24px 'Genshin'"
          ctx.fillText(`Lv. ${chara[i + 5].level}`, 50 + i * 225 + 100, 1534)
        })
      charaImg3.length !== 0 &&
        charaImg3.forEach((img, i) => resizeImg(img, 50 + i * 225, 1480, 0.5))
      charaImg4.length !== 0 &&
        charaImg4.forEach((img, i) => resizeImg(img, 50 + i * 225, 1700, 0.5))

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
