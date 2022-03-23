import { Button } from "../../structures/Button"

export default new Button({
  name: "suggestion",
  run: async ({ interaction }) => {
    return await interaction.reply("button pressed")
  },
})
