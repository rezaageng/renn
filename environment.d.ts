declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      DEV_ROLE_ID: string
      ADMIN_ID: string
      GUILD_ID: string
      ENVIROMENT: string
    }
  }
}

export {}