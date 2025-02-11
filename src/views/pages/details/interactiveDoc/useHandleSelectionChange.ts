import { useCallback } from 'react'
import { MutableRefObject } from 'react'

interface Position {
  x: number
  y: number
}

interface HoverToolbarState {
  show: boolean
  position: Position | null
}

const getSelectionRect = (range: Range): DOMRect => {
  const startContainer = range.startContainer

  if (startContainer.nodeType === Node.TEXT_NODE) {
    try {
      const tempRange = range.cloneRange()
      const nodeLength = startContainer.textContent?.length || 0
      const endOffset = Math.min(tempRange.startOffset + 1, nodeLength)
      tempRange.setEnd(tempRange.startContainer, endOffset)
      const rect = tempRange.getBoundingClientRect()
      tempRange.detach()
      return rect
    } catch (error) {
      return range.getBoundingClientRect()
    }
  }
  
  return (startContainer as Element).getBoundingClientRect()
}

const calculatePosition = (rect: DOMRect): Position => ({
  x: rect.left + window.scrollX,
  y: rect.top + window.scrollY
})

const useHandleSelectionChange = (
  hoverToolbar: HoverToolbarState,
  setHoverToolbar: React.Dispatch<React.SetStateAction<HoverToolbarState>>,
  selectionStartPosition: MutableRefObject<Position | null>
) => {
  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection()

    if (!selection) {
      setHoverToolbar({ show: false, position: null })
      selectionStartPosition.current = null
      return
    }

    const isValidSelection = !selection.isCollapsed && selection.rangeCount > 0

    if (isValidSelection && !hoverToolbar.show) {
      try {
        const range = selection.getRangeAt(0)
        const rect = getSelectionRect(range)
        const position = calculatePosition(rect)

        selectionStartPosition.current = position
        setHoverToolbar({ show: true, position })
      } catch (error) {
        console.error('Error handling selection change:', error)
        setHoverToolbar({ show: false, position: null })
        selectionStartPosition.current = null
      }
    } else if (!isValidSelection) {
      setHoverToolbar({ show: false, position: null })
      selectionStartPosition.current = null
    }
  }, [hoverToolbar.show, setHoverToolbar, selectionStartPosition])

  return { handleSelectionChange }
}

export default useHandleSelectionChange