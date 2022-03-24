import { ButtonInteraction, Message, PermissionResolvable } from "discord.js"
import { ExtendedClient } from "../structures/Client"

interface RunButtonOptions {
  client: ExtendedClient
  interaction: ButtonInteraction
  action: string
  user: string
}

type RunButtonFunction = (options: RunButtonOptions) => Promise<void | Message>

export type ButtonType = {
  name: string
  userPermissions?: PermissionResolvable[]
  run: RunButtonFunction
}
