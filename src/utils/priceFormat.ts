export const removeExtraDecimalDigits = (num: number): number => {
  const numStr = num?.toString()
  const decimalIndex = numStr?.indexOf('.')

  if (decimalIndex !== -1 && numStr?.length - decimalIndex - 1 > 2) {
    return parseFloat(numStr.slice(0, decimalIndex + 3))
  }

  return num
}
