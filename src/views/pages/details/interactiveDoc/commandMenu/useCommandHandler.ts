import { useCallback } from 'react'
import { CommandMenuState } from '../types'
import { Command } from '.'

const useCommandHandler = (
  setCommandMenu: React.Dispatch<React.SetStateAction<CommandMenuState>>,
  updateBlocks?: () => void
) => {
  const handleCommandSelect = useCallback(
    (cmd: Command) => {
      setCommandMenu({ show: false, position: null, filterText: '', blockId: undefined })

      const selection = window.getSelection()
      if (!selection || !selection.rangeCount) {
        console.error('No selection found')

        return
      }

      const range = selection.getRangeAt(0)
      const blockElement =
        range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer.parentElement?.closest('[data-block-id]')
          : (range.startContainer as HTMLElement).closest('[data-block-id]')

      if (!blockElement) {
        console.error('No active block found')

        return
      }

      const contentColumn = blockElement.querySelector('.flex-1') as HTMLElement
      if (!contentColumn) {
        console.error('Content column not found in block')

        return
      }

      const contentElement = contentColumn.querySelector('[contenteditable="true"]') as HTMLElement
      if (!contentElement) {
        console.error('Editable content element not found')

        return
      }

      const text = contentElement.textContent?.trim() || ''

      switch (cmd.value) {
        case 'h1':
          applyHeadingWithStyle(contentElement, 'h1', text)
          break
        case 'h2':
          applyHeadingWithStyle(contentElement, 'h2', text)
          break
        case 'bullet':
          applyBulletList(contentElement, text)
          break
        case 'checklist':
          applyChecklist(contentElement, text)
          break
      }

      if (updateBlocks) {
        setTimeout(() => {
          updateBlocks()
        }, 0)
      }
    },
    [setCommandMenu, updateBlocks]
  )

  return { handleCommandSelect }
}

const applyHeadingWithStyle = (contentElement: HTMLElement, headingType: 'h1' | 'h2', text: string): void => {
  if (headingType === 'h1') {
    contentElement.innerHTML = `<h1 class="text-3xl font-bold mt-4 mb-2">${text || '&nbsp;'}</h1>`
  } else {
    contentElement.innerHTML = `<h2 class="text-2xl font-semibold mt-3 mb-1">${text || '&nbsp;'}</h2>`
  }

  contentElement.focus()

  const heading = contentElement.querySelector(headingType)
  if (heading) {
    try {
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()

        const range = document.createRange()

        if (heading.firstChild && heading.firstChild.nodeType === Node.TEXT_NODE) {
          range.setStart(heading.firstChild, heading.firstChild.textContent?.length || 0)
        } else {
          range.setStart(heading, 0)
        }

        range.collapse(true)
        selection.addRange(range)
      }
    } catch (error) {
      console.error('Error setting cursor position:', error)

      contentElement.focus()
    }
  }
}

const applyBulletList = (contentElement: HTMLElement, text: string): void => {
  contentElement.innerHTML = `<ul class="list-disc list-inside pl-4 my-2">${
    text ? `<li>${text}</li>` : '<li>&nbsp;</li>'
  }</ul>`

  contentElement.focus()

  try {
    const li = contentElement.querySelector('li')
    if (li) {
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()

        const range = document.createRange()

        if (li.firstChild && li.firstChild.nodeType === Node.TEXT_NODE) {
          range.setStart(li.firstChild, li.firstChild.textContent?.length || 0)
        } else {
          range.setStart(li, 0)
        }

        range.collapse(true)
        selection.addRange(range)
      }
    }
  } catch (error) {
    console.error('Error setting cursor position:', error)

    contentElement.focus()
  }
}

const applyChecklist = (contentElement: HTMLElement, text: string): void => {
  contentElement.innerHTML = `
    <div class="flex flex-col gap-2 my-2">
      <div class="flex items-center gap-2">
        <input type="checkbox" class="h-4 w-4 rounded border-gray-300">
        <div contenteditable="true" class="flex-1">${text || '&nbsp;'}</div>
      </div>
    </div>
  `

  const innerContentElement: any = contentElement.querySelector('[contenteditable="true"]')
  if (innerContentElement) {
    innerContentElement.focus()

    try {
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()

        const range = document.createRange()

        if (innerContentElement.firstChild && innerContentElement.firstChild.nodeType === Node.TEXT_NODE) {
          range.setStart(innerContentElement.firstChild, innerContentElement.firstChild.textContent?.length || 0)
        } else {
          range.setStart(innerContentElement, 0)
        }

        range.collapse(true)
        selection.addRange(range)
      }
    } catch (error) {
      console.error('Error setting cursor position:', error)

      innerContentElement.focus()
    }
  } else {
    contentElement.focus()
  }
}

export default useCommandHandler
