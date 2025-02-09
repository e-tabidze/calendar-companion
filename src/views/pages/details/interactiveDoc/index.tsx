import React, { useState, useRef, useCallback, useEffect } from 'react'
import HoverToolbar, { Position } from './hoverToolbar'
import CommandMenu from './commandMenu'
import useCommandHandler from './commandMenu/useCommandHandler'
import useApplyFormat from './commandMenu/useApplyFormat'
import useHandleSelectionChange from './commandMenu/useHandleSelectionChange'
import useDocSocket from './useDocSocket'
import { useRouter } from 'next/router'

type BlockType = 'text' | 'h1' | 'h2' | 'bullet' | 'checklist'

interface Block {
  id: string
  type: BlockType
  content: string
  index: number
}

interface MenuState {
  show: boolean
  position: Position | null
}

const InteractiveDoc: React.FC = () => {
  const [hoverToolbar, setHoverToolbar] = useState<MenuState>({
    show: false,
    position: null
  })
  const [commandMenu, setCommandMenu] = useState<{
    show: boolean
    position: Position | null
    filterText: string
    blockId?: string
  }>({
    show: false,
    position: null,
    filterText: ''
  })
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: '1',
      type: 'text',
      content: '',
      index: 0
    }
  ])

  const selectionStartPosition = useRef<Position | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleIncomingMessage = (newBlocks: Block[]) => {
    setBlocks(newBlocks)
  }

  const router = useRouter()

  const { slug } = router.query

  // Initialize WebSocket connection
  const { sendMessage } = useDocSocket({
    detailsId: String(slug),
    onMessageReceived: handleIncomingMessage
  })

  // Send updated block content to the server
  const broadcastChanges = useCallback(() => {
    if (!containerRef.current) return

    const updatedBlocks: Block[] = Array.from(containerRef.current.querySelectorAll('div[data-block-id]')).map(
      (div, index) => ({
        id: div.getAttribute('data-block-id') || `${Date.now()}-${index}`,
        type: 'text',
        content: div.innerHTML,
        index
      })
    )

    setBlocks(updatedBlocks)
    sendMessage(updatedBlocks) // Send changes to the server
  }, [sendMessage])

  const updateBlocksFromContainer = () => {
    if (!containerRef.current) return

    const divElements = containerRef.current.querySelectorAll('div[data-block-id]')
    const newBlocks: Block[] = Array.from(divElements).map((div, index) => ({
      id: div.getAttribute('data-block-id') || Date.now().toString(),
      type: 'text',
      content: div.innerHTML,
      index
    }))

    if (newBlocks.length === 0) {
      newBlocks.push({
        id: '1',
        type: 'text',
        content: containerRef.current.innerHTML,
        index: 0
      })
    }

    setBlocks(newBlocks)
  }

  const debouncedUpdateBlocks = useCallback(
    debounce(() => updateBlocksFromContainer(), 300),
    []
  )

  const handleContainerKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection()
    if (!selection || !containerRef.current) return

    if (e.key === '/') {
      e.preventDefault()
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      const containerRect = e.currentTarget.getBoundingClientRect()

      let currentBlock = range.startContainer.parentElement
      let blockId = currentBlock?.getAttribute('data-block-id')

      if (!blockId) {
        blockId = Date.now().toString()
        currentBlock?.setAttribute('data-block-id', blockId)
      }

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

    debouncedUpdateBlocks()
  }, [])

  const handleContainerInput = useCallback(() => {
    if (!containerRef.current) return

    const ensureBlockIds = () => {
      const walker = document.createTreeWalker(containerRef.current!, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node: any) => {
          if (node === containerRef.current) return NodeFilter.FILTER_SKIP
          if (!node.getAttribute('data-block-id')) return NodeFilter.FILTER_ACCEPT
          return NodeFilter.FILTER_SKIP
        }
      })

      let node
      while ((node = walker.nextNode())) {
        const element = node as Element
        if (!element.getAttribute('data-block-id')) {
          element.setAttribute('data-block-id', Date.now().toString())
        }
      }
    }

    broadcastChanges()
    ensureBlockIds()
    debouncedUpdateBlocks()
  }, [broadcastChanges])

  const { handleCommandSelect } = useCommandHandler(setCommandMenu, () => {
    debouncedUpdateBlocks()
  })

  const { applyFormat } = useApplyFormat(setHoverToolbar, selectionStartPosition)
  const { handleSelectionChange } = useHandleSelectionChange(hoverToolbar, setHoverToolbar, selectionStartPosition)

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [handleSelectionChange])

  useEffect(() => {
    if (containerRef.current && containerRef.current.children.length === 0) {
      const div = document.createElement('div')
      div.setAttribute('data-block-id', '1')
      div.innerHTML = '<br>'
      containerRef.current.appendChild(div)
    }
  }, [])

  console.log('Current blocks:', blocks)

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
        onInput={handleContainerInput}
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

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default InteractiveDoc
