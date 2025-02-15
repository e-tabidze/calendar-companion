import React, { useCallback, useRef, useLayoutEffect, useState, useEffect } from 'react'
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

const MemoizedHoverToolbar = React.memo(HoverToolbar)
const MemoizedCommandMenu = React.memo(CommandMenu)

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
  const sendMessageRef = useRef<(content: string | Block[]) => void>(() => {})

  const { slug } = useRouter().query

  const { sendMessage } = useDocSocket({
    detailsId: String(slug),
    onMessageReceived: (content: string) => {
      if (!containerRef.current) return

      const selection = window.getSelection()
      const activeElement = document.activeElement
      let savedRange = null
      if (selection?.rangeCount) {
        savedRange = selection.getRangeAt(0).cloneRange()
      }

      if (Array.isArray(content)) {
        const existingBlocks = Array.from(containerRef.current.children).map(child => ({
          id: child.getAttribute('data-block-id'),
          element: child
        }))

        content.forEach(block => {
          const existingBlock = containerRef.current?.querySelector(`[data-block-id="${block.id}"]`)
          if (existingBlock) {
            if (existingBlock.innerHTML !== block.content) {
              existingBlock.innerHTML = block.content
            }
          } else {
            const div = document.createElement('div')
            div.setAttribute('data-block-id', block.id)
            div.innerHTML = block.content
            containerRef.current?.appendChild(div)
          }
        })

        existingBlocks.forEach(({ id, element }) => {
          if (!content.find(block => block.id === id)) {
            element.remove()
          }
        })

        setBlocks(content)
      } else if (typeof content === 'string') {
        containerRef.current.innerHTML = content
        updateBlocks()
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
    sendMessage: sendMessageRef.current
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
