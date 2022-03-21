import { Command } from "../../structures/Command"

export default new Command({
  name: "ping",
  description: "Pong!",
  run: async ({ interaction }) => {
    interaction.reply("Pong!")
  },
})
