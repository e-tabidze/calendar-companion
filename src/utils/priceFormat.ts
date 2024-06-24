export const removeLastDigitIfThreeDecimalPlaces = (num: number): number => {
  let numStr = num?.toString()
  const decimalIndex = numStr?.indexOf('.')

  if (decimalIndex !== -1 && numStr?.length - decimalIndex - 1 === 3) {
    numStr = numStr?.slice(0, -1)
  }

  return parseFloat(numStr)
}

export const removeExtraDecimalDigits = (num: number): number => {
  const numStr = num.toString()
  const decimalIndex = numStr.indexOf('.')

  if (decimalIndex !== -1 && numStr.length - decimalIndex - 1 > 2) {
    return parseFloat(numStr.slice(0, decimalIndex + 3))
  }

  return num
}
