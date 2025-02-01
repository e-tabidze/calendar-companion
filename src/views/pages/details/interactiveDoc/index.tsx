import React, { useState, useRef, useEffect, useCallback } from 'react'
import HoverToolbar, { Position } from './hoverToolbar'

const COMMANDS = [
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Bullet List', value: 'bullet' },
  { label: 'Checklist', value: 'checklist' }
] as const

type BlockType = 'text' | 'h1' | 'h2' | 'bullet' | 'checklist'
type CommandType = typeof COMMANDS[number]['value']

interface MenuState {
  show: boolean
  position: Position | null
}

interface Block {
  id: string
  type: BlockType
  content: string
}

interface Command {
  label: string
  value: CommandType
}

interface CommandMenuProps {
  position: Position | null
  onSelect: (cmd: Command) => void
  filterText: string
}

const CommandMenu: React.FC<CommandMenuProps> = ({ position, onSelect, filterText }) => {
  const filteredCommands = COMMANDS.filter(cmd => cmd.label.toLowerCase().includes(filterText.toLowerCase()))

  if (!filteredCommands.length || !position) return null

  return (
    <div
      className='absolute bg-white shadow-lg rounded-lg border border-gray-200 w-48 z-50'
      style={{
        top: `${position.y + 24}px`,
        left: `${position.x}px`,
        transform: 'translate(-50%, 0)'
      }}
    >
      {filteredCommands.map(cmd => (
        <button
          key={cmd.value}
          className='w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none'
          onClick={() => onSelect(cmd)}
        >
          {cmd.label}
        </button>
      ))}
    </div>
  )
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
  const [blocks, setBlocks] = useState<Block[]>([{ id: '1', type: 'text', content: '' }])
  const selectionStartPosition = useRef<Position | null>(null)

  const handleCommandSelect = useCallback((command: Command) => {
    const selection = window.getSelection()
    if (!selection) return

    const range = selection.getRangeAt(0)
    const container = range.commonAncestorContainer as HTMLElement
    const targetBlock = container.nodeType === Node.TEXT_NODE ? container.parentElement : container
    const text = range.toString().trim().replace('/', '')

    if (!targetBlock) return

    const commands: Record<CommandType, () => void> = {
      h1: () => {
        const h1 = document.createElement('h1')
        h1.className = 'text-2xl font-bold mt-4'
        h1.textContent = text || 'Heading 1'
        h1.contentEditable = 'true'

        const br = document.createElement('br')
        range.deleteContents()
        range.insertNode(h1)
        range.insertNode(br)

        const newRange = document.createRange()
        newRange.selectNodeContents(h1)
        newRange.collapse(false)
        selection.removeAllRanges()
        selection.addRange(newRange)
      },
      h2: () => document.execCommand('formatBlock', false, 'h2'),
      bullet: () => document.execCommand('insertUnorderedList'),
      checklist: () => {
        // Implement checklist logic
      }
    }

    commands[command.value]()
    setCommandMenu(prev => ({ ...prev, show: false, position: null, filterText: '' }))
  }, [])

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
        const newBlock = {
          id: Date.now().toString(),
          type: 'text' as const,
          content: ''
        }
        const index = blocks.findIndex(b => b.id === blockId)
        setBlocks(prev => [...prev.slice(0, index + 1), newBlock, ...prev.slice(index + 1)])
      }
    },
    [blocks]
  )

  const handleSelectionChange = useCallback(() => {
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) {
      if (!hoverToolbar.show) {
        const range = selection.getRangeAt(0)
        const startContainer = range.startContainer
        let rect: DOMRect

        if (startContainer.nodeType === Node.TEXT_NODE) {
          const tempRange = range.cloneRange()
          tempRange.setEnd(tempRange.startContainer, tempRange.startOffset + 1)
          rect = tempRange.getBoundingClientRect()
          tempRange.detach()
        } else {
          rect = (startContainer as Element).getBoundingClientRect()
        }

        const position = {
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY
        }

        selectionStartPosition.current = position
        setHoverToolbar({ show: true, position })
      }
    } else {
      setHoverToolbar({ show: false, position: null })
      selectionStartPosition.current = null
    }
  }, [hoverToolbar.show])

  const applyFormat = useCallback((format: string) => {
    if (['bold', 'italic', 'underline'].includes(format)) {
      document.execCommand(format)
    } else if (format === 'link') {
      const url = prompt('Enter URL:')
      if (url) {
        document.execCommand('createLink', false, url)
      }
    }
    setHoverToolbar({ show: false, position: null })
    selectionStartPosition.current = null
  }, [])

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [handleSelectionChange])

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
          className='min-h-[200px] p-4 rounded-lg focus:outline-none'
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
