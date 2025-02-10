import { useCallback } from 'react'

export const COMMANDS = [
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Bullet List', value: 'bullet' },
  { label: 'Checklist', value: 'checklist' }
] as const

export interface Command {
  label: string
  value: CommandType
}

type CommandType = typeof COMMANDS[number]['value']

const createNewBlockId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const useCommandHandler = (setCommandMenu: any, handleCreateNewBlock: any) => {
  const handleCommandSelect = useCallback((command: Command) => {
    const selection = window.getSelection()
    if (!selection) return

    const range = selection.getRangeAt(0)
    const container = range.commonAncestorContainer as HTMLElement
    const targetBlock = container.nodeType === Node.TEXT_NODE ? container.parentElement : container
    const text = range.toString().trim().replace('/', '')

    if (!targetBlock) return

    const blockElement = targetBlock.closest('[data-block-id]')
    if (!blockElement) return

    const blockParent = blockElement.parentElement
    if (!blockParent) return

    const commands: Record<CommandType, () => void> = {
      h1: () => {
        const h1 = document.createElement('h1')
        h1.className = 'text-2xl font-bold mt-4'
        h1.textContent = text || 'Heading 1'
        h1.contentEditable = 'true'

        blockElement.innerHTML = ''
        blockElement.appendChild(h1)

        const newRange = document.createRange()
        newRange.selectNodeContents(h1)
        newRange.collapse(false)
        selection.removeAllRanges()
        selection.addRange(newRange)

        const inputEvent = new InputEvent('input', {
          bubbles: true,
          cancelable: true
        })
        blockParent.dispatchEvent(inputEvent)
      },
      h2: () => {
        const h2 = document.createElement('h2')
        h2.className = 'text-xl font-bold mt-3'
        h2.textContent = text || 'Heading 2'
        h2.contentEditable = 'true'

        blockElement.innerHTML = ''
        blockElement.appendChild(h2)

        const newRange = document.createRange()
        newRange.selectNodeContents(h2)
        newRange.collapse(false)
        selection.removeAllRanges()
        selection.addRange(newRange)

        const inputEvent = new InputEvent('input', {
          bubbles: true,
          cancelable: true
        })
        blockParent.dispatchEvent(inputEvent)
      },
      bullet: () => {
        const existingList = blockElement.querySelector('ul')
        if (existingList) {
          const li = document.createElement('li')
          li.contentEditable = 'true'
          li.textContent = text || ''
          if (!text) li.innerHTML = '<br>'

          const currentLi = targetBlock.closest('li')
          if (currentLi) {
            existingList.insertBefore(li, currentLi.nextSibling)
          } else {
            existingList.appendChild(li)
          }
        } else {
          const ul = document.createElement('ul')
          ul.className = 'list-disc list-inside my-2'

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

          blockElement.innerHTML = ''
          blockElement.appendChild(ul)
        }

        const list = blockElement.querySelector('ul')
        const lastLi = list?.lastElementChild
        if (lastLi) {
          const newRange = document.createRange()
          newRange.selectNodeContents(lastLi)
          newRange.collapse(false)
          selection.removeAllRanges()
          selection.addRange(newRange)
        }

        const inputEvent = new InputEvent('input', {
          bubbles: true,
          cancelable: true
        })
        blockParent.dispatchEvent(inputEvent)
      },
      checklist: () => {
        const createChecklistItem = (content: string = '') => {
          const itemDiv = document.createElement('div')
          itemDiv.className = 'flex items-center gap-2'
          itemDiv.innerHTML = `
            <input type="checkbox" class="h-4 w-4 rounded border-gray-300">
            <div contenteditable="true" class="flex-1">${content || '<br>'}</div>
          `
          return itemDiv
        }

        const checklistContainer = document.createElement('div')
        checklistContainer.className = 'flex flex-col gap-2 my-2'

        if (text) {
          const lines = text.split('\n').filter(line => line.trim())
          lines.forEach(line => {
            checklistContainer.appendChild(createChecklistItem(line))
          })
        } else {
          checklistContainer.appendChild(createChecklistItem())
        }

        blockElement.innerHTML = ''
        blockElement.appendChild(checklistContainer)

        const lastItem = checklistContainer.lastElementChild?.querySelector('[contenteditable="true"]')
        if (lastItem) {
          const newRange = document.createRange()
          newRange.selectNodeContents(lastItem)
          newRange.collapse(false)
          selection.removeAllRanges()
          selection.addRange(newRange)
        }

        const inputEvent = new InputEvent('input', {
          bubbles: true,
          cancelable: true
        })
        blockParent.dispatchEvent(inputEvent)
      }
    }

    commands[command.value]()
    setCommandMenu((prev: any) => ({ ...prev, show: false, position: null, filterText: '' }))
  }, [])

  return { handleCommandSelect }
}

export default useCommandHandler
