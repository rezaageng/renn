import { GenshinKit } from "@genshin-kit/core"
import "dotenv/config"
import { ExtendedClient } from "./structures/Client"

export const client = new ExtendedClient()

export const Hoyo = new GenshinKit()
Hoyo.setServerType("os")
Hoyo.loginWithCookie(process.env.HOYOLAB_COOKIE)

client.start()
