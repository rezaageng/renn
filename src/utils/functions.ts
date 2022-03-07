import fs from "fs"

const getFiles = (path: string, ending: string) => {
  return fs.readdirSync(path).filter((file) => file.endsWith(ending))
}

module.exports = { getFiles }
