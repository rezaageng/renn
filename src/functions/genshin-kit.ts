import { GenshinKit } from "@genshin-kit/core"

const Hoyo = new GenshinKit()
Hoyo.setServerType("os")
Hoyo.loginWithCookie(process.env.HOYOLAB_COOKIE)

export { Hoyo }
