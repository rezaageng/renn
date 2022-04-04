import { Event } from "../structures/Event"

export default new Event("guildMemberAdd", async (member) => {
  const roleId = process.env.MEMBER_ROLE_ID
  const role = member.guild.roles.cache.get(roleId).rawPosition
  const clientRole = member.guild.me.roles.highest.rawPosition

  if (role > clientRole) return

  member.roles.add(roleId)
})
