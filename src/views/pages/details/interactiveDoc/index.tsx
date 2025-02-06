import React, { useState, useRef, useCallback, useEffect } from 'react'
import HoverToolbar, { Position } from './hoverToolbar'
import CommandMenu from './commandMenu'
import useCommandHandler from './commandMenu/useCommandHandler'
import useApplyFormat from './commandMenu/useApplyFormat'
import useHandleSelectionChange from './commandMenu/useHandleSelectionChange'

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

  const handleCreateNewBlock = (e: any, blockId: string) => {
    const currentIndex = blocks.findIndex(b => b.id === blockId)
    const newBlock = {
      id: Date.now().toString(),
      type: 'text' as const,
      content: '',
      index: currentIndex + 1
    }

    handleBlockContent(blockId, e.currentTarget.innerHTML)

    setBlocks(prev => [
      ...prev.slice(0, currentIndex + 1),
      newBlock,
      ...prev.slice(currentIndex + 1).map(block => ({
        ...block,
        index: block.index + 1
      }))
    ])

    setTimeout(() => {
      const newBlockEl = document.querySelector(`[data-block-id="${newBlock.id}"]`)
      if (newBlockEl) {
        ;(newBlockEl as HTMLElement).focus()
      }
    }, 0)
  }

  const { handleCommandSelect } = useCommandHandler(setCommandMenu, handleCreateNewBlock)

  const { applyFormat } = useApplyFormat(setHoverToolbar, selectionStartPosition)

  const { handleSelectionChange } = useHandleSelectionChange(hoverToolbar, setHoverToolbar, selectionStartPosition)

  const handleBlockContent = (blockId: string, content: string) => {
    setBlocks(prev => prev.map(block => (block.id === blockId ? { ...block, content } : block)))
  }

  const handleContainerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const selection = window.getSelection()

    if (e.metaKey && e.key === 'a') {
      e.preventDefault()
      if (!selection || !containerRef.current) return

      const range = document.createRange()
      range.selectNodeContents(containerRef.current)
      selection.removeAllRanges()
      selection.addRange(range)
    }

    if (e.key === 'Backspace') {
      if (selection?.rangeCount && selection.getRangeAt(0).toString().trim()) {
        setBlocks([{ id: '1', type: 'text', content: '', index: 0 }])

        setTimeout(() => {
          const firstBlock = document.querySelector('[data-block-id="1"]')
          if (firstBlock) {
            ;(firstBlock as HTMLElement).innerHTML = ''
            ;(firstBlock as HTMLElement).focus()
          }
        }, 0)
      }
    }
  }

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
        e.preventDefault()
        const targetBlock = e.currentTarget
        const ul = targetBlock.querySelector('ul')

        if (ul) {
          const li = document.createElement('li')
          li.contentEditable = 'true'
          li.innerHTML = '<br>'
          ul.appendChild(li)

          const selection = window.getSelection()
          const range = document.createRange()
          range.setStart(li, 0)
          range.collapse(true)
          selection?.removeAllRanges()
          selection?.addRange(range)
        } else {
          handleCreateNewBlock(e, blockId)
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
      <div
        className='text-lg text-gray-500 focus:outline-none mt-3'
        contentEditable
        suppressContentEditableWarning
        onInput={e => handleCreateNewBlock(e, 'content')}
      >
        👉 Add a subtitle to let others know how this template should be used
      </div>
      <div
        ref={containerRef}
        className='min-h-[200px] rounded-lg focus:outline-none'
        onKeyDown={handleContainerKeyDown}
        // contentEditable
      >
        {blocks.map(block => (
          <div
            key={block.id}
            data-block-id={block.id}
            className='min-h-[24px] mb-2 focus:outline-none'
            contentEditable
            suppressContentEditableWarning
            onKeyDown={e => handleKeyDown(e, block.id)}
            onInput={e => handleBlockContent(block.id, e.currentTarget.innerHTML)}
          />
        ))}
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
