import { MutableRefObject, useCallback } from 'react'
import { createNewBlockId, getCaretPosition } from './utils'
import { CommandMenuState } from './types'

type ContainerRef = MutableRefObject<HTMLDivElement | null>

type UpdateBlocks = () => void

type HandleCreateNewBlock = () => void

type SetCommandMenu = React.Dispatch<React.SetStateAction<CommandMenuState>>

const useContainerKeyDown = (
  containerRef: ContainerRef,
  updateBlocks: UpdateBlocks,
  handleCreateNewBlock: HandleCreateNewBlock,
  setCommandMenu: SetCommandMenu
) => {
  const handleContainerKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const selection = window.getSelection()
      if (!selection || !containerRef.current) return

      const range = selection.getRangeAt(0)
      const currentBlock =
        range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer.parentElement?.closest('[data-block-id]')
          : (range.startContainer as HTMLElement).closest('[data-block-id]')

      if (!currentBlock) return

      const currentList = currentBlock.querySelector('ul')
      const currentListItem =
        range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer.parentElement?.closest('li')
          : (range.startContainer as HTMLElement).closest('li')

      const checklistContainer = currentBlock.querySelector('.flex.flex-col.gap-2')
      const checklistItem =
        range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer.parentElement?.closest('.flex.items-center.gap-2')
          : (range.startContainer as HTMLElement).closest('.flex.items-center.gap-2')
      const contentDiv = checklistItem?.querySelector('[contenteditable="true"]')

      if (checklistContainer && checklistItem && contentDiv) {
        if (
          (e.key === 'Backspace' || (e.key === 'Delete' && e.metaKey)) &&
          contentDiv.textContent?.trim() === '' &&
          getCaretPosition() === 0
        ) {
          e.preventDefault()

          const containerRect = containerRef.current.getBoundingClientRect()
          const itemRect = checklistItem.getBoundingClientRect()
          const relativeTop = itemRect.top - containerRect.top

          const newBlock = document.createElement('div')
          const newBlockId = createNewBlockId()
          newBlock.setAttribute('data-block-id', newBlockId)
          newBlock.innerHTML = '<br>'

          currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)

          if (checklistContainer.children.length <= 1) {
            currentBlock.remove()
          } else {
            checklistItem.remove()
          }

          const newRange = document.createRange()
          newRange.selectNodeContents(newBlock)
          newRange.collapse(true)
          selection.removeAllRanges()
          selection.addRange(newRange)

          newBlock.style.display = 'block'

          const newBlockRect = newBlock.getBoundingClientRect()
          const newRelativeTop = newBlockRect.top - containerRect.top

          if (newRelativeTop !== relativeTop) {
            const spacer = document.createElement('div')
            spacer.style.height = '0'
            spacer.style.marginTop = `${relativeTop - newRelativeTop}px`
            newBlock.insertBefore(spacer, newBlock.firstChild)
          }

          updateBlocks()

          return
        }

        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()

          if (contentDiv.textContent?.trim() === '' && checklistContainer.children.length > 1) {
            if (checklistItem === checklistContainer.lastElementChild) {
              const newBlock = document.createElement('div')
              const newBlockId = createNewBlockId()
              newBlock.setAttribute('data-block-id', newBlockId)
              newBlock.innerHTML = '<br>'

              const containerRect = containerRef.current.getBoundingClientRect()
              const itemRect = checklistItem.getBoundingClientRect()
              const relativeTop = itemRect.top - containerRect.top

              currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)
              checklistItem.remove()

              if (checklistContainer.children.length === 0) {
                currentBlock.remove()
              }

              const newRange = document.createRange()
              newRange.selectNodeContents(newBlock)
              newRange.collapse(true)
              selection.removeAllRanges()
              selection.addRange(newRange)

              newBlock.style.display = 'block'

              const newBlockRect = newBlock.getBoundingClientRect()
              const newRelativeTop = newBlockRect.top - containerRect.top

              if (newRelativeTop !== relativeTop) {
                const spacer = document.createElement('div')
                spacer.style.height = '0'
                spacer.style.marginTop = `${relativeTop - newRelativeTop}px`
                newBlock.insertBefore(spacer, newBlock.firstChild)
              }
            } else {
              checklistItem.remove()
            }
          } else {
            const newItem = document.createElement('div')
            newItem.className = 'flex items-center gap-2'
            newItem.innerHTML = `
                  <input type="checkbox" class="h-4 w-4 rounded border-gray-300">
                  <div contenteditable="true" class="flex-1"><br></div>
                `

            checklistItem.parentNode?.insertBefore(newItem, checklistItem.nextSibling)
            const newContentDiv = newItem.querySelector('[contenteditable="true"]')

            if (newContentDiv) {
              const newRange = document.createRange()
              newRange.selectNodeContents(newContentDiv)
              newRange.collapse(true)
              selection.removeAllRanges()
              selection.addRange(newRange)
            }
          }
          updateBlocks()

          return
        }
      }

      if (currentList && currentListItem) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()

          if (currentListItem.textContent?.trim() === '' && currentList.children.length > 1) {
            if (currentListItem === currentList.lastElementChild) {
              const containerRect = containerRef.current.getBoundingClientRect()
              const itemRect = currentListItem.getBoundingClientRect()
              const relativeTop = itemRect.top - containerRect.top

              const newBlock = document.createElement('div')
              const newBlockId = createNewBlockId()
              newBlock.setAttribute('data-block-id', newBlockId)
              newBlock.innerHTML = '<br>'

              currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)
              currentListItem.remove()

              if (currentList.children.length === 0) {
                currentBlock.remove()
              }

              const newRange = document.createRange()
              newRange.selectNodeContents(newBlock)
              newRange.collapse(true)
              selection.removeAllRanges()
              selection.addRange(newRange)

              newBlock.style.display = 'block'

              const newBlockRect = newBlock.getBoundingClientRect()
              const newRelativeTop = newBlockRect.top - containerRect.top

              if (newRelativeTop !== relativeTop) {
                const spacer = document.createElement('div')
                spacer.style.height = '0'
                spacer.style.marginTop = `${relativeTop - newRelativeTop}px`
                newBlock.insertBefore(spacer, newBlock.firstChild)
              }
            } else {
              currentListItem.remove()
            }
          } else {
            const newLi = document.createElement('li')
            newLi.contentEditable = 'true'
            newLi.innerHTML = '<br>'

            currentListItem.parentNode?.insertBefore(newLi, currentListItem.nextSibling)

            const newRange = document.createRange()
            newRange.selectNodeContents(newLi)
            newRange.collapse(true)
            selection.removeAllRanges()
            selection.addRange(newRange)
          }
          updateBlocks()

          return
        }

        if (
          (e.key === 'Backspace' || (e.key === 'Delete' && e.metaKey)) &&
          currentListItem.textContent?.trim() === '' &&
          getCaretPosition() === 0
        ) {
          e.preventDefault()

          const containerRect = containerRef.current.getBoundingClientRect()
          const itemRect = currentListItem.getBoundingClientRect()
          const relativeTop = itemRect.top - containerRect.top

          const newBlock = document.createElement('div')
          const newBlockId = createNewBlockId()
          newBlock.setAttribute('data-block-id', newBlockId)
          newBlock.innerHTML = '<br>'

          currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)
          currentListItem.remove()

          if (currentList.children.length === 0) {
            currentBlock.remove()
          }

          const newRange = document.createRange()
          newRange.selectNodeContents(newBlock)
          newRange.collapse(true)
          selection.removeAllRanges()
          selection.addRange(newRange)

          newBlock.style.display = 'block'

          const newBlockRect = newBlock.getBoundingClientRect()
          const newRelativeTop = newBlockRect.top - containerRect.top

          if (newRelativeTop !== relativeTop) {
            const spacer = document.createElement('div')
            spacer.style.height = '0'
            spacer.style.marginTop = `${relativeTop - newRelativeTop}px`
            newBlock.insertBefore(spacer, newBlock.firstChild)
          }

          updateBlocks()

          return
        }
      }

      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleCreateNewBlock()

        return
      }

      if (e.key === '/') {
        e.preventDefault()
        const rect = range.getBoundingClientRect()
        const containerRect = e.currentTarget.getBoundingClientRect()

        const blockId = currentBlock.getAttribute('data-block-id') || createNewBlockId()
        currentBlock.setAttribute('data-block-id', blockId)

        setCommandMenu({
          show: true,
          position: {
            x: rect.width === 0 ? containerRect.left + 100 : rect.left,
            y: rect.bottom + window.scrollY
          },
          blockId,
          filterText: ''
        })
      }

      if (e.metaKey && e.key === 'a') {
        e.preventDefault()
        const range = document.createRange()
        range.selectNodeContents(containerRef.current)
        selection.removeAllRanges()
        selection.addRange(range)
      }
    },
    [handleCreateNewBlock, updateBlocks]
  )

  return { handleContainerKeyDown }
}

export default useContainerKeyDown
