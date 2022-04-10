const dateFormat = (date: string) => {
  const formatted = new Date(
    (date as unknown as number) * 1000
  ).toLocaleDateString("en-US", { timeZone: "Asia/Jakarta" })

  return formatted
}

export { dateFormat }
