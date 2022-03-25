import { PassiveTalentDetail } from "genshin-db"

export class ExtendedPassiveTalentDetail implements PassiveTalentDetail {
  name: string
  info: string
  empty?: boolean
}
