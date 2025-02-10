import React, { useState, useRef, useCallback, useEffect } from 'react'
import HoverToolbar, { Position } from './hoverToolbar'
import CommandMenu from './commandMenu'
import useCommandHandler from './commandMenu/useCommandHandler'
import useDocSocket from './useDocSocket'
import { useRouter } from 'next/router'
import useApplyFormat from './useApplyFormat'
import useHandleSelectionChange from './useHandleSelectionChange'

interface Block {
  id: string
  type: 'text' | 'h1' | 'h2' | 'bullet' | 'checklist'
  content: string
  index: number
}

interface MenuState {
  show: boolean
  position: Position | null
}

const createNewBlockId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const InteractiveDoc: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([{ id: '1', type: 'text', content: '', index: 0 }])
  const [hoverToolbar, setHoverToolbar] = useState<MenuState>({ show: false, position: null })
  const [commandMenu, setCommandMenu] = useState({
    show: false,
    position: null as Position | null,
    filterText: '',
    blockId: undefined as string | undefined
  })

  const selectionStartPosition = useRef<Position | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { slug } = useRouter().query

  const { sendMessage } = useDocSocket({
    detailsId: String(slug),
    onMessageReceived: (content: string) => {
      if (containerRef.current && typeof content === 'string') {
        containerRef.current.innerHTML = content
        updateBlocks()
      }
    }
  })

  const handleDocumentChange = useCallback(() => {
    if (!containerRef.current) return
    sendMessage(containerRef.current.innerHTML)
    updateBlocks()
  }, [sendMessage])

  const updateBlocks = useCallback(() => {
    if (!containerRef.current) return

    const updatedBlocks: Block[] = Array.from(containerRef.current.children).map((element, index) => {
      if (!element.hasAttribute('data-block-id')) {
        element.setAttribute('data-block-id', createNewBlockId())
      }

      const blockType = (): Block['type'] => {
        if (element.querySelector('h1')) return 'h1'
        if (element.querySelector('h2')) return 'h2'
        if (element.querySelector('ul')) return 'bullet'
        if (element.classList.contains('checklist')) return 'checklist'
        return 'text'
      }

      return {
        id: element.getAttribute('data-block-id') || createNewBlockId(),
        type: blockType(),
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
  }, [sendMessage])

  const handleCreateNewBlock = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || !containerRef.current) return

    const newBlockId = createNewBlockId()
    const newBlock = document.createElement('div')
    newBlock.setAttribute('data-block-id', newBlockId)
    newBlock.innerHTML = '<br>'

    const range = selection.getRangeAt(0)
    const currentBlock = range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement?.closest('[data-block-id]')
      : (range.startContainer as HTMLElement).closest('[data-block-id]')

    if (currentBlock) {
      currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)
      
      // Move cursor to new block
      const newRange = document.createRange()
      newRange.selectNodeContents(newBlock)
      newRange.collapse(true)
      selection.removeAllRanges()
      selection.addRange(newRange)
    }

    updateBlocks()
  }, [updateBlocks])

  const handleContainerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const selection = window.getSelection()
      if (!selection || !containerRef.current) return

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleCreateNewBlock()
        return
      }

      if (e.key === '/') {
        e.preventDefault()
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        const containerRect = e.currentTarget.getBoundingClientRect()

        const currentBlock = range.startContainer.parentElement
        const blockId = currentBlock?.getAttribute('data-block-id') || createNewBlockId()
        currentBlock?.setAttribute('data-block-id', blockId)

        setCommandMenu({
          show: true,
          position: {
            x: rect.width === 0 ? containerRect.left + 100 : rect.left,
            y: rect.bottom + window.scrollY
          },
          blockId,
          filterText: ''
        })
      }

      if (e.metaKey && e.key === 'a') {
        e.preventDefault()
        const range = document.createRange()
        range.selectNodeContents(containerRef.current)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    },
    [handleCreateNewBlock]
  )

  const { handleCommandSelect } = useCommandHandler(setCommandMenu, handleCreateNewBlock)
  const { applyFormat } = useApplyFormat(setHoverToolbar, selectionStartPosition)
  const { handleSelectionChange } = useHandleSelectionChange(hoverToolbar, setHoverToolbar, selectionStartPosition)

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [handleSelectionChange])

  useEffect(() => {
    if (containerRef.current?.children.length === 0) {
      const div = document.createElement('div')
      div.setAttribute('data-block-id', '1')
      div.innerHTML = '<br>'
      containerRef.current.appendChild(div)
      updateBlocks()
    }
  }, [updateBlocks])

  console.log(blocks, 'blocks')

  return (
    <div className='w-full'>
      <div
        className='text-4xl font-bold text-gray-500 focus:outline-none'
        contentEditable
        suppressContentEditableWarning
      >
        Add page title
      </div>
      <div className='text-lg text-gray-500 focus:outline-none mt-3' contentEditable suppressContentEditableWarning>
        👉 Add a subtitle to let others know how this template should be used
      </div>
      <div
        ref={containerRef}
        className='min-h-[200px] rounded-lg focus:outline-none p-4'
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleContainerKeyDown}
        onInput={handleDocumentChange}
      />
      {commandMenu.show && (
        <CommandMenu
          position={commandMenu.position}
          onSelect={handleCommandSelect}
          filterText={commandMenu.filterText}
        />
      )}
      {hoverToolbar.show && hoverToolbar.position && (
        <HoverToolbar onSelect={applyFormat} position={hoverToolbar.position} />
      )}
    </div>
  )
}

export default InteractiveDoc