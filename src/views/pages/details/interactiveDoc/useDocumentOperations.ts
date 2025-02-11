import { useCallback, MutableRefObject } from 'react'
import { Block } from './types'
import { createNewBlockId } from './utils'

interface UseDocumentOperationsProps {
  containerRef: MutableRefObject<HTMLDivElement | null>
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
  sendMessage: (content: string | Block[]) => void
}

const determineBlockType = (element: HTMLElement): Block['type'] => {
  if (element.tagName === 'H1') return 'h1'
  if (element.tagName === 'H2') return 'h2'
  if (element.classList.contains('bullet')) return 'bullet'
  if (element.classList.contains('checklist')) return 'checklist'
  return 'text'
}

const findCurrentBlock = (range: Range): HTMLElement | null => {
  let currentNode: any = range.startContainer
  while (currentNode) {
    if (currentNode instanceof HTMLElement && currentNode.hasAttribute('data-block-id')) {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return null
}

const setSelectionToStart = (element: HTMLElement, selection: Selection) => {
  const range = document.createRange()
  range.selectNodeContents(element)
  range.collapse(true)
  selection.removeAllRanges()
  selection.addRange(range)
}

export const useDocumentOperations = ({ containerRef, setBlocks, sendMessage }: UseDocumentOperationsProps) => {
  const updateBlocks = useCallback(() => {
    if (!containerRef.current) return

    const updatedBlocks: Block[] = Array.from(containerRef.current.children).map((element, index) => {
      if (!(element instanceof HTMLElement)) {
        throw new Error('Invalid element type')
      }

      const elementId = element.getAttribute('data-block-id') || createNewBlockId()
      if (!element.hasAttribute('data-block-id')) {
        element.setAttribute('data-block-id', elementId)
      }

      return {
        id: elementId,
        type: determineBlockType(element),
        content: element.outerHTML,
        index
      }
    })

    if (updatedBlocks.length === 0) {
      updatedBlocks.push({
        id: '1',
        type: 'text',
        content: '<div data-block-id="1"><br></div>',
        index: 0
      })
    }

    setBlocks(updatedBlocks)
    sendMessage(updatedBlocks)
  }, [containerRef, setBlocks, sendMessage])

  const handleCreateNewBlock = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || !containerRef.current) return

    const newBlockId = createNewBlockId()
    const newBlock = document.createElement('div')
    newBlock.setAttribute('data-block-id', newBlockId)
    newBlock.innerHTML = '<br>'

    const range = selection.getRangeAt(0)
    const currentBlock = findCurrentBlock(range)

    if (currentBlock) {
      currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)
      setSelectionToStart(newBlock, selection)
    }

    updateBlocks()
  }, [containerRef, updateBlocks])

  return {
    updateBlocks,
    handleCreateNewBlock
  }
}