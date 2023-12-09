export const generateYearsArray = () => {
  const currentYear = new Date().getFullYear()
  const startYear = 1980
  const years = []
  for (let i = currentYear; i >= startYear; i--) {
    years.push({ value: i, label: i })
  }

  return years
}
