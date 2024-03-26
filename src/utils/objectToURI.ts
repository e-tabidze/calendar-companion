export const objectToURI = (obj: any) => {
  return Object.entries(obj)
    .filter(([value]) => {
      return value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)
    })
    .map(([key, value]: [string, any]) => {
      if (key === 'booking' && value !== null && value !== undefined) {
        const { book_from, book_to } = value

        return [`book_from=${encodeURIComponent(book_from)}`, `book_to=${encodeURIComponent(book_to)}`]
      } else if (Array.isArray(value)) {
        return value.map(v => `${encodeURIComponent(key)}[]=${encodeURIComponent(v)}`)
      } else {
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      }
    })
    .flat()
    .join('&')
}
