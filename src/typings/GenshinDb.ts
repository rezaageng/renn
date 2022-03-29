import { PassiveTalentDetail } from "genshin-db"

export class ExtendedPassiveTalentDetail implements PassiveTalentDetail {
  name: string
  info: string
  empty?: boolean
}

export interface TalentAttributes {
  labels: string[]
  parameters: { [key: string]: number[] }
}
export type asc = number | "+" | "-"
