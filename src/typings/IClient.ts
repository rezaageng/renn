import { ApplicationCommandDataResolvable } from "discord.js"

export interface RegisterCommandsOptions {
  GUILD_ID?: string
  commands: ApplicationCommandDataResolvable[]
}
