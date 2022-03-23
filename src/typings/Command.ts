import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  PermissionResolvable,
} from "discord.js"
import { ExtendedClient } from "../structures/Client"

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember
}

interface RunCommandOptions {
  client: ExtendedClient
  interaction: ExtendedInteraction
  args: CommandInteractionOptionResolver
}

type RunCommandFunction = (options: RunCommandOptions) => Promise<void>

export type CommandType = {
  userPermissions?: PermissionResolvable[]
  run: RunCommandFunction
} & ChatInputApplicationCommandData
