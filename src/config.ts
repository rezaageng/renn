import "dotenv/config"

const { TOKEN, DEV } = process.env

if (!TOKEN || !DEV) {
  console.error("Missing environment variables")
  process.exit(1)
}

const config: Record<string, string> = {
  TOKEN,
  DEV,
}

export default config
