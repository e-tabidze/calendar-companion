import { useCallback, useRef } from 'react'
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
  // Create refs to store the latest values without causing re-renders
  const hoverToolbarRef = useRef(hoverToolbar)
  const positionRef = useRef<Position | null>(null)
  
  // Update refs when props change
  hoverToolbarRef.current = hoverToolbar
  
  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection()

    if (!selection) {
      if (hoverToolbarRef.current.show) {
        setHoverToolbar({ show: false, position: null })
        selectionStartPosition.current = null
      }
      return
    }

    const isValidSelection = !selection.isCollapsed && selection.rangeCount > 0

    if (isValidSelection) {
      try {
        const range = selection.getRangeAt(0)
        const rect = getSelectionRect(range)
        const newPosition = calculatePosition(rect)

        // Only update if position has changed significantly
        const hasPositionChanged = !positionRef.current || 
          Math.abs(positionRef.current.x - newPosition.x) > 5 || 
          Math.abs(positionRef.current.y - newPosition.y) > 5

        if (!hoverToolbarRef.current.show || hasPositionChanged) {
          positionRef.current = newPosition
          selectionStartPosition.current = newPosition
          setHoverToolbar({ show: true, position: newPosition })
        }
      } catch (error) {
        console.error('Error handling selection change:', error)
        if (hoverToolbarRef.current.show) {
          setHoverToolbar({ show: false, position: null })
          selectionStartPosition.current = null
        }
      }
    } else if (hoverToolbarRef.current.show) {
      setHoverToolbar({ show: false, position: null })
      selectionStartPosition.current = null
    }
  }, [setHoverToolbar, selectionStartPosition]) // Removed hoverToolbar from dependencies

  return { handleSelectionChange }
}

export default useHandleSelectionChange