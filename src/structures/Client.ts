import {
  ApplicationCommandDataResolvable,
  Client,
  Collection,
} from "discord.js"
import { glob } from "glob"
import { promisify } from "util"
import { CommandType } from "../typings/Command"
import { RegisterCommandOptions } from "../typings/IClient"

const globPromise = promisify(glob)

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection()

  constructor() {
    super({
      partials: ["CHANNEL"],
      intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES"],
    })
  }

  start() {
    this.login(process.env.TOKEN)
  }

  async importFiles(path: string) {
    return (await import(path))?.default
  }

  async registerCommands({ GUILD_ID, commands }: RegisterCommandOptions) {
    if (GUILD_ID) {
      this.guilds.cache.get(GUILD_ID)?.commands.set(commands)
      console.log(`registered commands to guild ${GUILD_ID}`)
    }

    this.application?.commands.set(commands)
    console.log("Registered global commands")
  }

  async registerModules() {
    const slashCommands: ApplicationCommandDataResolvable[] = []
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`
    )

    commandFiles.forEach(async (file) => {
      const command: CommandType = await this.importFiles(file)

      if (!command.name) return
      this.commands.set(command.name, command)
      slashCommands.push(command)
    })
  }
}
