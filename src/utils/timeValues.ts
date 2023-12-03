export const generateTimeOptions = () => {
  const options = []

  for (let hour = 0; hour < 24; hour++) {
    const time = hour.toString().padStart(2, '0') + ':00'
    options.push({ value: time, label: time })
  }

  return options
}
