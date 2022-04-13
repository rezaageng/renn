import { Image, CanvasRenderingContext2D } from "canvas"

export const resizeImg = (
  ctx: CanvasRenderingContext2D,
  img: Image,
  x: number,
  y: number,
  scale: number
) => {
  ctx.save()
  ctx.translate(x, y)
  ctx.scale(scale, scale)
  ctx.drawImage(img, 0, 0)
  ctx.restore()
}

export const dateFormat = (date: string) => {
  const formatted = new Date(
    (date as unknown as number) * 1000
  ).toLocaleDateString("en-US", { timeZone: "Asia/Jakarta" })

  return formatted
}
