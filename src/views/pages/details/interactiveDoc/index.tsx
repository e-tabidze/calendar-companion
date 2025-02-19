import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
import HoverToolbar from './hoverToolbar'
import CommandMenu from './commandMenu'
import useCommandHandler from './commandMenu/useCommandHandler'
import useDocSocket from './useDocSocket'
import { useRouter } from 'next/router'
import useApplyFormat from './useApplyFormat'
import useHandleSelectionChange from './useHandleSelectionChange'
import { useDocumentOperations } from './useDocumentOperations'
import { Block, MenuState, Position } from './types'
import useContainerKeyDown from './useContainerKeyDown'
import useUserData from 'src/hooks/useUserData'

const MemoizedHoverToolbar = React.memo(HoverToolbar)
const MemoizedCommandMenu = React.memo(CommandMenu)

const InteractiveDoc: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [hoverToolbar, setHoverToolbar] = useState<MenuState>({ show: false, position: null })
  const [commandMenu, setCommandMenu] = useState({
    show: false,
    position: null as Position | null,
    filterText: '',
    blockId: undefined as string | undefined
  })

  const { userData } = useUserData()
  const selectionStartPosition = useRef<Position | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sendMessageRef = useRef<(content: string | Block[]) => void>(() => {
    return
  })

  const { slug } = useRouter().query

  const { sendMessage } = useDocSocket({
    detailsId: String(slug),
    onMessageReceived: (content: Block[]) => {
      if (!containerRef.current) return

      const selection = window.getSelection()
      const activeElement = document.activeElement
      let savedRange = null
      if (selection?.rangeCount) {
        savedRange = selection.getRangeAt(0).cloneRange()
      }

      if (Array.isArray(content)) {
        // Ensure only the latest update per index is displayed
        const latestBlocks: Record<number, Block> = {}

        content.forEach(block => {
          latestBlocks[block.index] = block // Overwrite any previous updates for the same index
        })

        // Convert map to sorted array
        const sortedBlocks = Object.values(latestBlocks).sort((a, b) => a.index - b.index)

        setBlocks(sortedBlocks)

        // Update the DOM manually
        containerRef.current.innerHTML = "" // Clear the container before rendering

        sortedBlocks.forEach(block => {
          const div = document.createElement("div")
          div.setAttribute("data-block-index", String(block.index))
          div.setAttribute("data-block-id", block.id)
          div.innerHTML = block.content
          containerRef.current?.appendChild(div)
        })
      }

      if (savedRange && activeElement === containerRef.current) {
        try {
          selection?.removeAllRanges()
          selection?.addRange(savedRange)
        } catch (error) {
          console.warn('Could not restore cursor position')
        }
      }
    }
  })

  sendMessageRef.current = sendMessage

  const { updateBlocks, handleCreateNewBlock, handleKeyDown, handleKeyUp } = useDocumentOperations({
    containerRef,
    setBlocks,
    sendMessage: sendMessageRef.current,
    username: userData?.username
  })

  const { handleContainerKeyDown } = useContainerKeyDown(
    containerRef,
    updateBlocks,
    handleCreateNewBlock,
    setCommandMenu
  )
  const { handleCommandSelect } = useCommandHandler(setCommandMenu)
  const { applyFormat } = useApplyFormat(setHoverToolbar, selectionStartPosition)
  const { handleSelectionChange } = useHandleSelectionChange(hoverToolbar, setHoverToolbar, selectionStartPosition)

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    
return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [handleSelectionChange])

  useLayoutEffect(() => {
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
        onKeyDown={e => {
          handleContainerKeyDown(e)
          handleKeyDown()
        }}
        onKeyUp={handleKeyUp}
      />
      {commandMenu.show && (
        <MemoizedCommandMenu
          position={commandMenu.position}
          onSelect={handleCommandSelect}
          filterText={commandMenu.filterText}
        />
      )}
      {hoverToolbar.show && hoverToolbar.position && (
        <MemoizedHoverToolbar onSelect={applyFormat} position={hoverToolbar.position} />
      )}
    </div>
  )
}

export default InteractiveDoc
