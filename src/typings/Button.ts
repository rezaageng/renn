import { ButtonInteraction, PermissionResolvable } from "discord.js"
import { ExtendedClient } from "../structures/Client"

interface RunButtonOptions {
  client: ExtendedClient
  interaction: ButtonInteraction
}

type RunButtonFunction = (options: RunButtonOptions) => Promise<void>

export type ButtonType = {
  name: string
  userPermissions?: PermissionResolvable[]
  run: RunButtonFunction
}
