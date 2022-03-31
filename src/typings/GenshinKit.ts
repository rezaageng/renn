import { Character } from "@genshin-kit/core/lib/types"
import { UserStats } from "@genshin-kit/core/lib/types/UserInfo"

export interface ExtendedUserStats extends UserStats {
  electroculus_number: number
  magic_chest_number: number
}

export interface ExtendedCharacter extends Character {
  card_image: string
}
