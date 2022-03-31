import {
  ChatInputApplicationCommandData,
  CommandInteraction,
  CommandInteractionOptionResolver,
  GuildMember,
  Message,
  PermissionResolvable,
} from "discord.js"
import { APIMessage } from "discord-api-types"
import { ExtendedClient } from "../structures/Client"

export interface ExtendedInteraction extends CommandInteraction {
  member: GuildMember
}

interface RunCommandOptions {
  client: ExtendedClient
  interaction: ExtendedInteraction
  args: CommandInteractionOptionResolver
}

type RunCommandFunction = (
  options: RunCommandOptions
) => Promise<void | Message | APIMessage>

export type CommandType = {
  userPermissions?: PermissionResolvable[]
  run: RunCommandFunction
} & ChatInputApplicationCommandData
