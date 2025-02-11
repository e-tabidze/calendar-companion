import { useCallback } from 'react'

export const COMMANDS = [
  { label: 'Heading 1', value: 'h1' },
  { label: 'Heading 2', value: 'h2' },
  { label: 'Bullet List', value: 'bullet' },
  { label: 'Checklist', value: 'checklist' }
] as const

export type CommandType = typeof COMMANDS[number]['value']

export interface Command {
  label: string
  value: CommandType
}

interface CommandMenuState {
  show: boolean
  position: { x: number; y: number } | null
  filterText: string
  blockId: string | undefined
}

const createInputEvent = () => new InputEvent('input', { bubbles: true, cancelable: true })

const setSelectionToEnd = (element: HTMLElement, selection: Selection) => {
  const range = document.createRange()
  range.selectNodeContents(element)
  range.collapse(false)
  selection.removeAllRanges()
  selection.addRange(range)
}

const createHeadingElement = (tag: 'h1' | 'h2', text: string, className: string): HTMLHeadingElement => {
  const heading = document.createElement(tag)
  heading.className = className
  heading.textContent = text || `${tag.toUpperCase()}`
  heading.contentEditable = 'true'
  return heading
}

const createBulletListItem = (text: string = ''): HTMLLIElement => {
  const li = document.createElement('li')
  li.contentEditable = 'true'
  li.innerHTML = text || '<br>'
  return li
}

const createChecklistItem = (content: string = ''): HTMLDivElement => {
  const itemDiv = document.createElement('div')
  itemDiv.className = 'flex items-center gap-2'
  itemDiv.innerHTML = `
    <input type="checkbox" class="h-4 w-4 rounded border-gray-300">
    <div contenteditable="true" class="flex-1">${content || '<br>'}</div>
  `
  return itemDiv
}

const useCommandHandler = (setCommandMenu: React.Dispatch<React.SetStateAction<CommandMenuState>>) => {
  const handleCommandSelect = useCallback(
    (command: Command) => {
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

      const commandHandlers: Record<CommandType, () => void> = {
        h1: () => {
          const h1 = createHeadingElement('h1', text, 'text-2xl font-bold mt-4')
          blockElement.innerHTML = ''
          blockElement.appendChild(h1)
          setSelectionToEnd(h1, selection)
          blockParent.dispatchEvent(createInputEvent())
        },
        h2: () => {
          const h2 = createHeadingElement('h2', text, 'text-xl font-bold mt-3')
          blockElement.innerHTML = ''
          blockElement.appendChild(h2)
          setSelectionToEnd(h2, selection)
          blockParent.dispatchEvent(createInputEvent())
        },
        bullet: () => {
          const existingList = blockElement.querySelector('ul')
          if (existingList) {
            const li = createBulletListItem(text)
            const currentLi = targetBlock.closest('li')
            const insertPosition = currentLi?.nextSibling || null
            existingList.insertBefore(li, insertPosition)
            setSelectionToEnd(li, selection)
          } else {
            const ul = document.createElement('ul')
            ul.className = 'list-disc list-inside my-2'

            const items = text
              ? text
                  .split('\n')
                  .filter(line => line.trim())
                  .map(line => createBulletListItem(line))
              : [createBulletListItem()]

            ul.append(...items)
            blockElement.innerHTML = ''
            blockElement.appendChild(ul)
            setSelectionToEnd(ul.lastElementChild as HTMLElement, selection)
          }
          blockParent.dispatchEvent(createInputEvent())
        },
        checklist: () => {
          const checklistContainer = document.createElement('div')
          checklistContainer.className = 'flex flex-col gap-2 my-2'

          const items = text
            ? text
                .split('\n')
                .filter(line => line.trim())
                .map(line => createChecklistItem(line))
            : [createChecklistItem()]

          checklistContainer.append(...items)
          blockElement.innerHTML = ''
          blockElement.appendChild(checklistContainer)

          const lastItem = checklistContainer.lastElementChild?.querySelector('[contenteditable="true"]')
          if (lastItem) {
            setSelectionToEnd(lastItem as HTMLElement, selection)
          }

          blockParent.dispatchEvent(createInputEvent())
        }
      }

      commandHandlers[command.value]()
      setCommandMenu(prev => ({ ...prev, show: false, position: null, filterText: '' }))
    },
    [setCommandMenu]
  )

  return { handleCommandSelect }
}

export default useCommandHandler
