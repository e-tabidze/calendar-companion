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
      }
    }
  })

  const handleDocumentChange = useCallback(() => {
    if (!containerRef.current) return
    sendMessage(containerRef.current.innerHTML)
  }, [sendMessage])

  const updateBlocks = useCallback(() => {
    if (!containerRef.current) return

    const updatedBlocks: Block[] = Array.from(containerRef.current.querySelectorAll('div[data-block-id]')).map(
      (div, index) => ({
        id: div.getAttribute('data-block-id') || `${Date.now()}-${index}`,
        type: 'text',
        content: div.innerHTML,
        index
      })
    )

    if (updatedBlocks.length === 0) {
      updatedBlocks.push({
        id: '1',
        type: 'text',
        content: containerRef.current.innerHTML,
        index: 0
      })
    }

    setBlocks(updatedBlocks)
    sendMessage(updatedBlocks)
  }, [sendMessage])

  const debouncedUpdateBlocks = useCallback(debounce(updateBlocks, 300), [updateBlocks])

  const handleContainerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const selection = window.getSelection()
      if (!selection || !containerRef.current) return

      if (e.key === '/') {
        e.preventDefault()
        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        const containerRect = e.currentTarget.getBoundingClientRect()

        const currentBlock = range.startContainer.parentElement
        const blockId = currentBlock?.getAttribute('data-block-id') || Date.now().toString()
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

      debouncedUpdateBlocks()
    },
    [debouncedUpdateBlocks]
  )

  const { handleCommandSelect } = useCommandHandler(setCommandMenu, debouncedUpdateBlocks)
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
    }
  }, [])

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

const debounce = (func: any, wait: number) => {
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
