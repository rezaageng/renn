import { UserStats } from "@genshin-kit/core/lib/types/UserInfo"

export interface ExtendedUserStats extends UserStats {
  electroculus_number: number
  magic_chest_number: number
}