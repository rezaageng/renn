import { ApplicationCommandDataResolvable } from "discord.js"

export interface RegisterCommandOptions {
  GUILD_ID?: string
  commands: ApplicationCommandDataResolvable[]
}
