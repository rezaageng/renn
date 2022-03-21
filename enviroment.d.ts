declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string
      DEV_ID: string
      GUILD_ID: string
      ENVIROMENT: string
    }
  }
}

export {}
