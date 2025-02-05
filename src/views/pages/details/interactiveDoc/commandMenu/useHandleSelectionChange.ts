import { useCallback } from 'react'

export const COMMANDS = [
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Bullet List', value: 'bullet' },
  { label: 'Checklist', value: 'checklist' }
] as const

export interface Command {
  label: string
  value: CommandType
}

type CommandType = typeof COMMANDS[number]['value']

type FormatType =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'link'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'insertUnorderedList'
  | 'createLink'
  | 'insertImage'
  | 'insertEmoji'
  | 'insertBlock'
  | 'strikethrough'
  | 'superscript'
  | 'subscript'
  | 'heading'
  | 'font'
  | 'codeLanguage'
  | 'askAI'

const useHandleSelectionChange = (hoverToolbar: any, setHoverToolbar: any, selectionStartPosition: any) => {
  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) {
      if (!hoverToolbar.show) {
        const range = selection.getRangeAt(0)
        const startContainer = range.startContainer
        let rect: DOMRect

        if (startContainer.nodeType === Node.TEXT_NODE) {
          try {
            const tempRange = range.cloneRange()
            const nodeLength = startContainer.textContent?.length || 0
            const endOffset = Math.min(tempRange.startOffset + 1, nodeLength)
            tempRange.setEnd(tempRange.startContainer, endOffset)
            rect = tempRange.getBoundingClientRect()
            tempRange.detach()
          } catch (error) {
            rect = range.getBoundingClientRect()
          }
        } else {
          rect = (startContainer as Element).getBoundingClientRect()
        }

        const position = {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY
        }

        selectionStartPosition.current = position
        setHoverToolbar({ show: true, position })
      }
    } else {
      setHoverToolbar({ show: false, position: null })
      selectionStartPosition.current = null
    }
  }, [hoverToolbar.show])

  return { handleSelectionChange }
}

export default useHandleSelectionChange
