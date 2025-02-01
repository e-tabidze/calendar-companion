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
      h2: () => {
        const h2 = document.createElement('h2')
        h2.className = 'text-xl font-bold mt-3'
        h2.textContent = text || 'Heading 2'
        h2.contentEditable = 'true'
  
        const br = document.createElement('br')
        range.deleteContents()
        range.insertNode(h2)
        range.insertNode(br)
  
        const newRange = document.createRange()
        newRange.selectNodeContents(h2)
        newRange.collapse(false)
        selection.removeAllRanges()
        selection.addRange(newRange)
      },
      bullet: () => {
        // Find the closest existing list or checklist container to the current selection
        const existingList = targetBlock.closest('ul')
        const existingChecklist = targetBlock.closest('.flex.flex-col.gap-2')
        
        // Create new list
        const ul = document.createElement('ul')
        ul.className = 'list-disc list-inside my-2'
  
        if (existingChecklist) {
          // Convert only this checklist item to bullet
          const contentDiv = targetBlock.querySelector('[contenteditable="true"]')
          const li = document.createElement('li')
          li.contentEditable = 'true'
          li.textContent = contentDiv?.textContent || ''
          ul.appendChild(li)
          
          // Replace only the current checklist item
          const checklistItem = targetBlock.closest('.flex.items-center.gap-2')
          if (checklistItem) {
            checklistItem.parentNode?.replaceChild(ul, checklistItem)
          } else {
            range.deleteContents()
            range.insertNode(ul)
          }
        } else if (existingList) {
          // If already in a bullet list, just add a new item
          const li = document.createElement('li')
          li.contentEditable = 'true'
          li.textContent = text || ''
          if (text) {
            existingList.appendChild(li)
          } else {
            const referenceNode = targetBlock.closest('li')?.nextSibling
            existingList.insertBefore(li, referenceNode || null)
          }
        } else {
          // Create new bullet list
          if (text) {
            const lines = text.split('\n').filter(line => line.trim())
            lines.forEach(line => {
              const li = document.createElement('li')
              li.textContent = line
              li.contentEditable = 'true'
              ul.appendChild(li)
            })
          } else {
            const li = document.createElement('li')
            li.innerHTML = '<br>'
            li.contentEditable = 'true'
            ul.appendChild(li)
          }
          range.deleteContents()
          range.insertNode(ul)
        }
  
        // Set cursor in the appropriate list item
        const lastLi = ul.lastElementChild || existingList?.lastElementChild
        if (lastLi) {
          const newRange = document.createRange()
          newRange.setStart(lastLi, 0)
          newRange.collapse(true)
          selection.removeAllRanges()
          selection.addRange(newRange)
        }
      },
      checklist: () => {
        // Find the closest list or checklist container to the current selection
        const existingList = targetBlock.closest('ul')
        const existingChecklist = targetBlock.closest('.flex.flex-col.gap-2')
  
        const createChecklistItem = (content: string = '') => {
          const itemDiv = document.createElement('div')
          itemDiv.className = 'flex items-center gap-2'
          itemDiv.innerHTML = `
            <input type="checkbox" class="h-4 w-4 rounded border-gray-300">
            <div contenteditable="true" class="flex-1">${content || '<br>'}</div>
          `
          return itemDiv
        }
  
        if (existingList) {
          // Convert only this bullet to checklist item
          const listItem = targetBlock.closest('li')
          if (listItem) {
            const container = document.createElement('div')
            container.className = 'flex flex-col gap-2 my-2'
            container.appendChild(createChecklistItem(listItem.textContent || ''))
            listItem.parentNode?.replaceChild(container, listItem)
          }
        } else if (!existingChecklist) {
          // Create new checklist container
          const container = document.createElement('div')
          container.className = 'flex flex-col gap-2 my-2'
          
          if (text) {
            const lines = text.split('\n').filter(line => line.trim())
            lines.forEach(line => {
              container.appendChild(createChecklistItem(line))
            })
          } else {
            container.appendChild(createChecklistItem())
          }
          range.deleteContents()
          range.insertNode(container)
        } else {
          // If already in a checklist, just add a new item after current
          const currentItem = targetBlock.closest('.flex.items-center.gap-2')
          const newItem = createChecklistItem(text)
          if (currentItem) {
            currentItem.parentNode?.insertBefore(newItem, currentItem.nextSibling)
          }
        }
  
        // Set cursor in the new checklist item
        const container = targetBlock.closest('.flex.flex-col.gap-2')
        const lastItem = container?.lastElementChild?.querySelector('[contenteditable="true"]')
        if (lastItem) {
          const newRange = document.createRange()
          newRange.setStart(lastItem, 0)
          newRange.collapse(true)
          selection.removeAllRanges()
          selection.addRange(newRange)
        }
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
          const range = selection.getRangeAt(0)
          const block = range.commonAncestorContainer
          let targetElement = block.nodeType === Node.TEXT_NODE ? block.parentElement : (block as HTMLElement)

          while (
            targetElement &&
            getComputedStyle(targetElement).display !== 'block' &&
            targetElement.tagName !== 'P' &&
            targetElement.tagName !== 'DIV'
          ) {
            targetElement = targetElement.parentElement
          }

          if (!targetElement || targetElement.tagName === 'BODY') {
            const div = document.createElement('div')
            range.surroundContents(div)
            targetElement = div
          }

          targetElement.style.textAlign =
            format === 'justifyLeft' ? 'left' : format === 'justifyCenter' ? 'center' : 'right'
          break
        }

        case 'insertUnorderedList': {
          const range = selection.getRangeAt(0)
          const block = range.commonAncestorContainer
          let targetElement: any = block.nodeType === Node.TEXT_NODE ? block.parentElement : (block as HTMLElement)

          const existingList = targetElement.closest('ul')
          if (existingList) {
            const fragment = document.createDocumentFragment()
            Array.from(existingList.children).forEach((li: any) => {
              const p = document.createElement('p')
              p.innerHTML = li.innerHTML
              fragment.appendChild(p)
            })

            existingList.parentNode?.replaceChild(fragment, existingList)
          } else {
            const ul = document.createElement('ul')
            ul.className = 'list-disc list-inside'

            const text = range.toString()
            if (text) {
              const lines = text.split('\n').filter(line => line.trim())
              lines.forEach(line => {
                const li = document.createElement('li')
                li.textContent = line
                ul.appendChild(li)
              })
            } else {
              const li = document.createElement('li')
              li.innerHTML = '<br>'
              ul.appendChild(li)
            }

            range.deleteContents()
            range.insertNode(ul)

            if (!text) {
              const newRange = document.createRange()
              newRange.setStart(ul.firstChild as Node, 0)
              newRange.collapse(true)
              selection.removeAllRanges()
              selection.addRange(newRange)
            }
          }
          break
        }

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
        // Check if we're in a checklist item
        const selection = window.getSelection()
        if (!selection) return

        const range = selection.getRangeAt(0)
        const checklistItem = range.commonAncestorContainer.parentElement?.closest('.flex.items-center.gap-2')
        const checklistContainer = checklistItem?.parentElement

        if (checklistItem && checklistContainer) {
          e.preventDefault() // Prevent default Enter behavior

          // Create new checklist item
          const newItem = document.createElement('div')
          newItem.className = 'flex items-center gap-2'
          newItem.innerHTML = `
            <input type="checkbox" class="h-4 w-4 rounded border-gray-300">
            <div contenteditable="true" class="flex-1"><br></div>
          `

          // Insert after current item
          if (checklistItem.nextSibling) {
            checklistContainer.insertBefore(newItem, checklistItem.nextSibling)
          } else {
            checklistContainer.appendChild(newItem)
          }

          // Move cursor to new item
          const editableDiv = newItem.querySelector('[contenteditable="true"]')
          if (editableDiv) {
            const newRange = document.createRange()
            newRange.setStart(editableDiv, 0)
            newRange.collapse(true)
            selection.removeAllRanges()
            selection.addRange(newRange)
          }
        } else {
          // Handle normal Enter key for non-checklist items
          const newBlock = {
            id: Date.now().toString(),
            type: 'text' as const,
            content: ''
          }
          const index = blocks.findIndex(b => b.id === blockId)
          setBlocks(prev => [...prev.slice(0, index + 1), newBlock, ...prev.slice(index + 1)])
        }
      }

      // Handle Backspace to remove empty checklist items
      if (e.key === 'Backspace') {
        const selection = window.getSelection()
        if (!selection) return

        const range = selection.getRangeAt(0)
        const checklistItem = range.commonAncestorContainer.parentElement?.closest('.flex.items-center.gap-2')
        const editableDiv = checklistItem?.querySelector('[contenteditable="true"]')

        if (checklistItem && editableDiv && editableDiv.textContent?.trim() === '') {
          const checklistContainer = checklistItem.parentElement
          if (checklistContainer?.children.length === 1) {
            // If it's the last item, remove the entire checklist
            checklistContainer.remove()
          } else {
            // Remove just this item
            checklistItem.remove()
          }
          e.preventDefault()
        }
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
          try {
            const tempRange = range.cloneRange()
            const nodeLength = startContainer.textContent?.length || 0
            const endOffset = Math.min(tempRange.startOffset + 1, nodeLength)
            tempRange.setEnd(tempRange.startContainer, endOffset)
            rect = tempRange.getBoundingClientRect()
            tempRange.detach()
          } catch (error) {
            rect = range.getBoundingClientRect()
          }
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
