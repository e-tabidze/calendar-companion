import React, { useRef, useState, useEffect } from 'react'
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
  const initializedRef = useRef(false)
  const lastBlockUserRef = useRef<Map<string, string>>(new Map())

  const { slug } = useRouter().query

  const { sendMessage } = useDocSocket({
    detailsId: userData ? String(slug) : '',

    onMessageReceived: (content: Block[]) => {
      if (!containerRef.current || !userData) return

      const selection = window.getSelection()
      const activeElement = document.activeElement
      let savedRange = null
      if (selection?.rangeCount) {
        savedRange = selection.getRangeAt(0).cloneRange()
      }

      if (Array.isArray(content)) {
        const latestBlocks: Record<number, Block> = {}

        console.log(content, 'content')

        content.forEach(block => {
          latestBlocks[block.index] = block
        })

        const sortedBlocks = Object.values(latestBlocks).sort((a, b) => a.index - b.index)

        if (sortedBlocks.length > 0) {
          initializedRef.current = true
        }

        setBlocks(sortedBlocks)

        containerRef.current.innerHTML = ''

        sortedBlocks.forEach(block => {
          const blockContainer = document.createElement('div')
          blockContainer.className = 'flex items-start py-2 relative'

          blockContainer.setAttribute('data-block-index', String(block.index))
          blockContainer.setAttribute('data-block-id', block.id)

          const timeColumn = document.createElement('div')
          timeColumn.className = 'presentation-only flex-shrink-0 text-sm text-gray-500 absolute -left-[100px]'
          timeColumn.textContent = '13:45am'

          const avatar = document.createElement('div')
          let initial = '?'

          const isT = initial === 'T'
          avatar.className = `presentation-only w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white absolute -left-[47px] z-10 ${
            isT ? 'bg-indigo-800' : 'bg-gray-800'
          }`
          avatar.textContent = initial

          const contentColumn = document.createElement('div')
          contentColumn.className = 'flex-1'

          const contentDiv = document.createElement('div')

          const isOwner = userData && userData.username === block.username
          contentDiv.setAttribute('contenteditable', isOwner ? 'true' : 'false')

          contentDiv.innerHTML = block.content

          contentColumn.appendChild(contentDiv)

          blockContainer.appendChild(timeColumn)
          blockContainer.appendChild(avatar)
          blockContainer.appendChild(contentColumn)

          containerRef.current?.appendChild(blockContainer)
        })

        const newBlockId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)
        const newIndex = sortedBlocks.length > 0 ? sortedBlocks[sortedBlocks.length - 1].index + 1 : 0

        const emptyLineContainer = document.createElement('div')
        emptyLineContainer.className = 'flex items-center py-2 relative'
        emptyLineContainer.setAttribute('data-block-index', String(newIndex))
        emptyLineContainer.setAttribute('data-block-id', newBlockId)

        const timeColumn = document.createElement('div')
        timeColumn.className = 'presentation-only flex-shrink-0 text-sm text-gray-500 absolute -left-[100px]'
        timeColumn.textContent = '13:45am'


        const avatar = document.createElement('div')
        let initial = userData.username.charAt(0).toUpperCase()
        const isT = initial === 'T'
        avatar.className = `presentation-only w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white absolute -left-[47px] z-10 ${
          isT ? 'bg-indigo-800' : 'bg-gray-800'
        }`
        avatar.textContent = initial

        const contentColumn = document.createElement('div')
        contentColumn.className = 'flex-1'

        const contentDiv = document.createElement('div')
        contentDiv.setAttribute('contenteditable', 'true')
        contentDiv.innerHTML = '<br>'
        contentColumn.appendChild(contentDiv)

        emptyLineContainer.appendChild(timeColumn)
        emptyLineContainer.appendChild(avatar)
        emptyLineContainer.appendChild(contentColumn)
        containerRef.current?.appendChild(emptyLineContainer)

        lastBlockUserRef.current.set(newBlockId, userData.username)
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

  useEffect(() => {
    if (userData) {
      sendMessageRef.current = sendMessage
    }
  }, [userData, sendMessage])

  const { updateBlocks, handleCreateNewBlock, handleKeyDown, handleKeyUp } = useDocumentOperations({
    containerRef,
    setBlocks,
    sendMessage: sendMessageRef.current,
    username: userData?.username || ''
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

  useEffect(() => {
    if (
      userData?.username &&
      !initializedRef.current &&
      containerRef.current &&
      containerRef.current.children.length === 0
    ) {
      handleCreateNewBlock(0)

      initializedRef.current = true
    }
  }, [userData, handleCreateNewBlock, initializedRef])

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
