export const createNewBlockId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

export const getCaretPosition = (): number => {
  const selection = window.getSelection()
  if (!selection || !selection.rangeCount) return 0

  const range = selection.getRangeAt(0)
  
return range.startOffset
}
