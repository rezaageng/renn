declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      DEV_ROLE_ID: string
      ADMIN_ID: string
      GUILD_ID: string
      COMMANDS_CHANNEL_ID: string
      FIRST_RABBIT_CHANNEL_ID: string
      ADMINISTRATOR_CHANNEL_ID: string
      ANON_CHANNEL_ID: string
      SHARE_CHANNEL_ID: string
      DEBUG_CHANNEL_ID: string
    }
  }
}

export {}
