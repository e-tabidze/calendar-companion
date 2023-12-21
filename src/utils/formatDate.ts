export const formatDate = (date: Date | null): string => {
  if (!date) return 'თარიღი'

  return date
    .toLocaleDateString('en-GB', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
    .split('/')
    .reverse()
    .join('-')
}
