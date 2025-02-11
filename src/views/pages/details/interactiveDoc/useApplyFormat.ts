import { useCallback } from 'react'
import { MutableRefObject } from 'react'

export type FormatType =
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

interface Position {
  x: number
  y: number
}

interface HoverToolbarState {
  show: boolean
  position: Position | null
}

const SIMPLE_FORMATS = new Set([
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'superscript',
  'subscript'
])

const KEEP_OPEN_FORMATS = new Set(['font', 'askAI'])

const AVAILABLE_FONTS = ['Arial', 'Times New Roman', 'Courier New', 'Georgia'] as const

const getBlockElement = (node: Node): HTMLElement | null => {
  let element = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as HTMLElement
  
  while (
    element &&
    getComputedStyle(element).display !== 'block' &&
    element.tagName !== 'P' &&
    element.tagName !== 'DIV'
  ) {
    element = element.parentElement
  }
  
  return element
}

const createList = (range: Range, selection: Selection): HTMLUListElement => {
  const ul = document.createElement('ul')
  ul.className = 'list-disc list-inside'

  const text = range.toString()
  if (text) {
    const lines = text.split('\n')
      .filter(line => line.trim())
      .map(line => {
        const li = document.createElement('li')
        li.textContent = line
        return li
      })
    ul.append(...lines)
  } else {
    const li = document.createElement('li')
    li.innerHTML = '<br>'
    ul.appendChild(li)

    const newRange = document.createRange()
    newRange.setStart(li, 0)
    newRange.collapse(true)
    selection.removeAllRanges()
    selection.addRange(newRange)
  }

  return ul
}

const handleAlignment = (format: 'justifyLeft' | 'justifyCenter' | 'justifyRight', range: Range) => {
  const block = range.commonAncestorContainer
  let targetElement = getBlockElement(block)

  if (!targetElement || targetElement.tagName === 'BODY') {
    const div = document.createElement('div')
    range.surroundContents(div)
    targetElement = div
  }

  const alignment = format === 'justifyLeft' ? 'left' : format === 'justifyCenter' ? 'center' : 'right'
  targetElement.style.textAlign = alignment
}

const handleListToggle = (range: Range, selection: Selection) => {
  const block = range.commonAncestorContainer
  const targetElement = getBlockElement(block)
  if (!targetElement) return

  const existingList = targetElement.closest('ul')
  if (existingList) {
    const fragment = document.createDocumentFragment()
    Array.from(existingList.children).forEach(li => {
      const p = document.createElement('p')
      p.innerHTML = li.innerHTML
      fragment.appendChild(p)
    })
    existingList.parentNode?.replaceChild(fragment, existingList)
  } else {
    const ul = createList(range, selection)
    range.deleteContents()
    range.insertNode(ul)
  }
}

const handleLink = (selection: Selection) => {
  const url = prompt('Enter URL:')
  if (!url) return

  document.execCommand('createLink', false, url)
  const link = selection.anchorNode?.parentElement
  if (link?.tagName === 'A') {
    link.setAttribute('target', '_blank')
  }
}

const handleImage = () => {
  const url = prompt('Enter image URL:')
  if (url) {
    document.execCommand('insertImage', false, url)
  }
}

const handleHeading = (selection: Selection) => {
  const range = selection.getRangeAt(0)
  const container = range.commonAncestorContainer.parentElement
  if (container) {
    const isHeading = container.tagName === 'H1'
    document.execCommand('formatBlock', false, isHeading ? 'p' : 'h1')
  }
}

const handleFont = () => {
  const font = prompt('Choose a font: ' + AVAILABLE_FONTS.join(', '))
  if (font) {
    document.execCommand('fontName', false, font)
  }
}

const useApplyFormat = (
  setHoverToolbar: React.Dispatch<React.SetStateAction<HoverToolbarState>>,
  selectionStartPosition: MutableRefObject<Position | null>
) => {
  const applyFormat = useCallback((format: FormatType) => {
    const selection = window.getSelection()
    if (!selection) return

    try {
      if (SIMPLE_FORMATS.has(format)) {
        document.execCommand(format)
      } else {
        const range = selection.getRangeAt(0)
        
        switch (format) {
          case 'justifyLeft':
          case 'justifyCenter':
          case 'justifyRight':
            handleAlignment(format, range)
            break

          case 'insertUnorderedList':
            handleListToggle(range, selection)
            break

          case 'createLink':
            handleLink(selection)
            break

          case 'insertImage':
            handleImage()
            break

          case 'heading':
            handleHeading(selection)
            break

          case 'font':
            handleFont()
            break

          case 'askAI':
            console.log('AI assistant requested for:', selection.toString())
            break
        }
      }
    } catch (error) {
      console.error('Error applying format:', error)
    }

    if (!KEEP_OPEN_FORMATS.has(format)) {
      setHoverToolbar({ show: false, position: null })
      selectionStartPosition.current = null
    }
  }, [])

  return { applyFormat }
}

export default useApplyFormat