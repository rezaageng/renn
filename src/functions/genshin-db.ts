import { Weapon } from "genshin-db"
export const formatWeaponEffect = (weapon: Weapon, formattype: number) => {
  let values: string[] = []

  switch (formattype) {
    case 0:
      values = weapon.r1
      break
    case 1:
      values = weapon.r2
      break
    case 2:
      values = weapon.r3
      break
    case 3:
      values = weapon.r4
      break
    case 4:
      values = weapon.r5
      break
  }

  let effect: string = weapon.effect
  for (let i = 0; i < values.length; i++) {
    effect = effect.replace(`{${i}}`, values[i])
  }

  return effect
}
