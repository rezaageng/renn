import chalk from "chalk"
import {
  ApplicationCommandDataResolvable,
  Client,
  ClientEvents,
  Collection,
} from "discord.js"
import glob from "glob"
import { promisify } from "util"
import { ButtonType } from "../typings/Button"
import { CommandType } from "../typings/Command"
import { RegisterCommandsOptions } from "../typings/IClient"
import { Event } from "./Event"

const globPromise = promisify(glob)

export class ExtendedClient extends Client {
  commands: Collection<string, CommandType> = new Collection()
  buttons: Collection<string, ButtonType> = new Collection()

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
      console.log(chalk.green(`\nregistered commands to guild ${GUILD_ID}`))
    } else {
      this.application?.commands.set(commands)
      console.log(chalk.green("\nRegistered global commands"))
    }
  }

  async registerModules() {
    // * commands
    const slashCommands: ApplicationCommandDataResolvable[] = []
    const commandFiles = await globPromise(
      `${__dirname}/../commands/*/*{.ts,.js}`
    )

    console.log(chalk.magenta("\nCommands:"))
    commandFiles.forEach(async (file, index) => {
      const command: CommandType = await this.importFiles(file)
      if (!command.name) return
      console.log(`${index + 1}. ${command.name} loaded`)

      this.commands.set(command.name, command)
      slashCommands.push(command)
    })

    this.on("ready", () => {
      this.registerCommands({
        commands: slashCommands,
        GUILD_ID: process.env.GUILD_ID,
      })
    })

    // *button
    const buttonFiles = await globPromise(
      `${__dirname}/../buttons/*/*{.ts,.js}`
    )

    console.log(chalk.magenta("\nButtons:"))
    buttonFiles.forEach(async (file, index) => {
      const buttons: ButtonType = await this.importFiles(file)
      if (!buttons.name) return
      console.log(`${index + 1}. ${buttons.name} loaded`)

      this.buttons.set(buttons.name, buttons)
    })

    // * events
    const eventFiles = await globPromise(`${__dirname}/../events/*{.ts,.js}`)

    console.log(chalk.magenta("\nEvents:"))
    eventFiles.forEach(async (file, index) => {
      const event: Event<keyof ClientEvents> = await this.importFiles(file)
      console.log(`${index + 1}. ${event.event} loaded`)

      this.on(event.event, event.run)
    })
  }
}
