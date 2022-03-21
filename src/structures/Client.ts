import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js"
import glob from "glob"
import { promisify } from "util"
import { CommandType } from "../typings/Command"
import { RegisterCommandsOptions } from "../typings/IClient"
import { Event } from "./Event"

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
    this.registerModules()
    this.login(process.env.TOKEN)
  }

  async importFiles(path: string) {
    return (await import(path))?.default
  }

  async registerCommands({ commands, GUILD_ID }: RegisterCommandsOptions) {
    if (GUILD_ID) {
      this.guilds.cache.get(GUILD_ID)?.commands.set(commands)
      console.log(`registered commands to guild ${GUILD_ID}`)
    }

    this.application?.commands.set(commands)
    console.log("Registered global commands")
  }

  async registerModules() {
    // * commands
    const slashCommands: ApplicationCommandDataResolvable[] = []
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`
    )

    commandFiles.forEach(async (file) => {
      const command: CommandType = await this.importFiles(file)
      if (!command.name) return
      console.log(command)

      this.commands.set(command.name, command)
      slashCommands.push(command)
    })

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        GUILD_ID: process.env.GUILD_ID,
      })
    })

    // * events
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`)

    eventFiles.forEach(async (file) => {
      const event: Event<keyof ClientEvents> = await this.importFiles(file)
      this.on(event.event, event.run)
    })
  }
}
