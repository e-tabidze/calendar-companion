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
    const blockId = blockElement?.getAttribute('data-block-id')

    const commands: Record<CommandType, () => void> = {
      h1: () => {
        const h1 = document.createElement('h1')
        h1.className = 'text-2xl font-bold mt-4'
        h1.textContent = text || 'Heading 1'
        h1.contentEditable = 'true'

        range.deleteContents()
        range.insertNode(h1)

        if (blockId) {
          handleCreateNewBlock({ currentTarget: blockElement }, blockId)
        }

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

        range.deleteContents()
        range.insertNode(h2)

        if (blockId) {
          handleCreateNewBlock({ currentTarget: blockElement }, blockId)
        }

        const newRange = document.createRange()
        newRange.selectNodeContents(h2)
        newRange.collapse(false)
        selection.removeAllRanges()
        selection.addRange(newRange)
      },
      bullet: () => {
        const existingList = targetBlock.closest('ul')
        const existingChecklist = targetBlock.closest('.flex.flex-col.gap-2')

        const ul = document.createElement('ul')
        ul.className = 'list-disc list-inside my-2'

        if (existingChecklist) {
          const contentDiv = targetBlock.querySelector('[contenteditable="true"]')
          const li = document.createElement('li')
          li.contentEditable = 'true'
          li.textContent = contentDiv?.textContent || ''
          ul.appendChild(li)

          const checklistItem = targetBlock.closest('.flex.items-center.gap-2')
          if (checklistItem) {
            checklistItem.parentNode?.replaceChild(ul, checklistItem)
          } else {
            range.deleteContents()
            range.insertNode(ul)
          }
        } else if (existingList) {
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
        const existingList = targetBlock.closest('ul')
        const existingChecklist = targetBlock.closest('.flex.flex-col.gap-2')

        const createChecklistItem = (content: any = '') => {
          const itemDiv = document.createElement('div')
          itemDiv.className = 'flex items-center gap-2'
          itemDiv.innerHTML = `
            <input type="checkbox" class="h-4 w-4 rounded border-gray-300">
            <div contenteditable="true" class="flex-1">${content || '<br>'}</div>
          `
          
          return itemDiv
        }

        if (existingList) {
          const listItem = targetBlock.closest('li')
          if (listItem) {
            const container = document.createElement('div')
            container.className = 'flex flex-col gap-2 my-2'
            container.appendChild(createChecklistItem(listItem.textContent || ''))
            listItem.parentNode?.replaceChild(container, listItem)
          }
        } else if (!existingChecklist) {
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
          const currentItem = targetBlock.closest('.flex.items-center.gap-2')
          const newItem = createChecklistItem(text)
          if (currentItem) {
            currentItem.parentNode?.insertBefore(newItem, currentItem.nextSibling)
          }
        }

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
    setCommandMenu((prev: any) => ({ ...prev, show: false, position: null, filterText: '' }))
  }, [])

  return { handleCommandSelect }
}

export default useCommandHandler
