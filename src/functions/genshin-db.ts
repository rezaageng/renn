import { Weapon } from "genshin-db"
import { TalentAttributes } from "../typings/GenshinDb"

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

export const talentLabelFormat = (
  attributes: TalentAttributes,
  level: number
) => {
  const outlabels: string[] = []

  const rx = /{(.*?)}/g
  for (let label of attributes.labels) {
    const matches = label.matchAll(rx)

    for (const match of matches) {
      const grab = match[1]
      const [paramnum, format] = grab.split(":")

      let value = attributes.parameters[paramnum][
        level ? level - 1 : 0
      ] as unknown

      if (format === "I") {
        label = label.replace(match[0], value as string)
        continue
      }
      if (format.includes("P")) value = (value as number) * 100

      value = (value as number).toFixed(format[1] as unknown as number)

      if (format.includes("P")) value = value + "%"

      label = label.replace(match[0], value as string)
    }
    outlabels.push(label)
  }
  return outlabels.map((label) => label.replace("|", ": ")).join("\n")
}
