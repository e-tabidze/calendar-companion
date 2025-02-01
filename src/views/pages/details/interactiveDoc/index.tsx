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
type FormatType =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'link'
  | 'justifyLeft'
  | 'justifyCenter'
  | 'justifyRight'
  | 'insertUnorderedList'
  | 'createLink'
  | 'insertImage'
  | 'insertEmoji'
  | 'insertBlock'
  | 'strikethrough'
  | 'superscript'
  | 'subscript'
  | 'heading'
  | 'font'
  | 'codeLanguage'
  | 'askAI'

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
        const div = document.createElement('div')
        div.className = 'flex items-center space-x-2'
        div.innerHTML = `
          <input type="checkbox" class="form-checkbox h-4 w-4" />
          <div contenteditable="true" class="flex-1">${text || 'New item'}</div>
        `
        range.deleteContents()
        range.insertNode(div)
      }
    }

    commands[command.value]()
    setCommandMenu(prev => ({ ...prev, show: false, position: null, filterText: '' }))
  }, [])

  const applyFormat = useCallback((format: FormatType) => {
    const selection = window.getSelection()
    if (!selection) return

    try {
      switch (format) {
        case 'bold':
        case 'italic':
        case 'underline':
        case 'strikethrough':
        case 'superscript':
        case 'subscript':
          document.execCommand(format)
          break

        case 'justifyLeft':
        case 'justifyCenter':
        case 'justifyRight': {
          // Get the current block element
          const range = selection.getRangeAt(0)
          const block = range.commonAncestorContainer
          let targetElement = block.nodeType === Node.TEXT_NODE ? block.parentElement : (block as HTMLElement)

          // Find the closest block-level parent if current element is not a block
          while (
            targetElement &&
            getComputedStyle(targetElement).display !== 'block' &&
            targetElement.tagName !== 'P' &&
            targetElement.tagName !== 'DIV'
          ) {
            targetElement = targetElement.parentElement
          }

          // If no block element found, wrap in a div
          if (!targetElement || targetElement.tagName === 'BODY') {
            const div = document.createElement('div')
            range.surroundContents(div)
            targetElement = div
          }

          // Apply alignment
          targetElement.style.textAlign =
            format === 'justifyLeft' ? 'left' : format === 'justifyCenter' ? 'center' : 'right'
          break
        }

        case 'insertUnorderedList':
          document.execCommand('insertUnorderedList')
          break

        case 'createLink': {
          const url = prompt('Enter URL:')
          if (url) {
            document.execCommand('createLink', false, url)
            const link = selection.anchorNode?.parentElement
            if (link?.tagName === 'A') {
              link.setAttribute('target', '_blank')
            }
          }
          break
        }

        case 'insertImage': {
          const url = prompt('Enter image URL:')
          if (url) {
            document.execCommand('insertImage', false, url)
          }
          break
        }

        case 'insertEmoji': {
          const emojis = ['😊', '👍', '❤️', '🎉', '🚀']
          const emoji = prompt('Choose an emoji: ' + emojis.join(' '))
          if (emoji) {
            document.execCommand('insertText', false, emoji)
          }
          break
        }

        case 'heading': {
          const range = selection.getRangeAt(0)
          const container = range.commonAncestorContainer.parentElement
          if (container) {
            const isHeading = container.tagName === 'H1'
            document.execCommand('formatBlock', false, isHeading ? 'p' : 'h1')
          }
          break
        }

        case 'font': {
          const fonts = ['Arial', 'Times New Roman', 'Courier New', 'Georgia']
          const font = prompt('Choose a font: ' + fonts.join(', '))
          if (font) {
            document.execCommand('fontName', false, font)
          }
          break
        }

        case 'askAI': {
          console.log('AI assistant requested for:', selection.toString())
          break
        }
      }
    } catch (error) {
      console.error('Error applying format:', error)
    }

    const keepOpenFormats: FormatType[] = ['font', 'askAI']
    if (!keepOpenFormats.includes(format)) {
      setHoverToolbar({ show: false, position: null })
      selectionStartPosition.current = null
    }
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
