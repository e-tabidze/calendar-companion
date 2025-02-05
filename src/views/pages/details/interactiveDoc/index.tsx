import React, { useState, useRef, useEffect, useCallback } from 'react'
import HoverToolbar, { Position } from './hoverToolbar'
import CommandMenu from './commandMenu'
import useCommandHandler from './commandMenu/useCommandHandler'
import useApplyFormat from './commandMenu/useApplyFormat'
import useHandleSelectionChange from './commandMenu/useHandleSelectionChange'

type BlockType = 'text' | 'h1' | 'h2' | 'bullet' | 'checklist'

interface MenuState {
  show: boolean
  position: Position | null
}

interface Block {
  id: string
  type: BlockType
  content: string
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
  const [blocks, setBlocks] = useState<Block[]>([])
  const selectionStartPosition = useRef<Position | null>(null)

  const { handleCommandSelect } = useCommandHandler(setCommandMenu)

  const { applyFormat } = useApplyFormat(setHoverToolbar, selectionStartPosition)

  const { handleSelectionChange } = useHandleSelectionChange(hoverToolbar, setHoverToolbar, selectionStartPosition)

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, blockId: string) => {
      if (e.key === '/') {
        e.preventDefault()
        const selection = window.getSelection()
        if (!selection) return

        const range = selection.getRangeAt(0)
        const rect = range.getBoundingClientRect()
        const containerRect = e.currentTarget.getBoundingClientRect()

        const x = rect.width === 0 ? containerRect.left + 100 : rect.left
        const y = rect.height === 0 ? e.currentTarget.offsetTop - 404 : rect.bottom

        setCommandMenu({
          show: true,
          position: { x, y: y + window.scrollY },
          blockId,
          filterText: ''
        })
      }

      if (e.key === 'Enter') {
        const selection = window.getSelection()
        if (!selection) return

        const range = selection.getRangeAt(0)
        const checklistItem = range.commonAncestorContainer.parentElement?.closest('.flex.items-center.gap-2')
        const checklistContainer = checklistItem?.parentElement

        if (checklistItem && checklistContainer) {
          e.preventDefault()

          const newItem = document.createElement('div')
          newItem.className = 'flex items-center gap-2'
          newItem.innerHTML = `
            <input type="checkbox" class="h-4 w-4 rounded border-gray-300">
            <div contenteditable="true" class="flex-1"><br></div>
          `

          if (checklistItem.nextSibling) {
            checklistContainer.insertBefore(newItem, checklistItem.nextSibling)
          } else {
            checklistContainer.appendChild(newItem)
          }

          const editableDiv = newItem.querySelector('[contenteditable="true"]')
          if (editableDiv) {
            const newRange = document.createRange()
            newRange.setStart(editableDiv, 0)
            newRange.collapse(true)
            selection.removeAllRanges()
            selection.addRange(newRange)
          }
        } else {
          const newBlock = {
            id: Date.now().toString(),
            type: 'text' as const,
            content: e.currentTarget.innerHTML
          }
          const index = blocks.findIndex(b => b.id === blockId)
          setBlocks(prev => [...prev.slice(0, index + 1), newBlock, ...prev.slice(index + 1)])
        }
      }

      if (e.key === 'Backspace') {
        const selection = window.getSelection()
        if (!selection) return

        const range = selection.getRangeAt(0)
        const checklistItem = range.commonAncestorContainer.parentElement?.closest('.flex.items-center.gap-2')
        const editableDiv = checklistItem?.querySelector('[contenteditable="true"]')

        if (checklistItem && editableDiv && editableDiv.textContent?.trim() === '') {
          const checklistContainer = checklistItem.parentElement
          if (checklistContainer?.children.length === 1) {
            checklistContainer.remove()
          } else {
            checklistItem.remove()
          }
          e.preventDefault()
        }
      }
    },
    [blocks]
  )

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [handleSelectionChange])

  console.log(blocks, 'blocks')

  return (
    <div className='w-full'>
      <div
        className='text-4xl font-bold text-gray-500 focus:outline-none'
        contentEditable
        suppressContentEditableWarning
        onKeyDown={e => handleKeyDown(e, 'title')}
      >
        Add page title
      </div>
      <div className='text-lg text-gray-500 focus:outline-none mt-3' contentEditable suppressContentEditableWarning>
        👉 Add a subtitle to let others know how this template should be used
      </div>
      <div>
        <div
          className='min-h-[200px] rounded-lg focus:outline-none'
          contentEditable
          suppressContentEditableWarning
          onKeyDown={e => handleKeyDown(e, 'content')}
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
    </div>
  )
}

export default InteractiveDoc
