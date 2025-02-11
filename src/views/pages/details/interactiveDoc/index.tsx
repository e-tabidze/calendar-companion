import React, { useState, useRef, useCallback, useEffect } from 'react'
import HoverToolbar, { Position } from './hoverToolbar'
import CommandMenu from './commandMenu'
import useCommandHandler from './commandMenu/useCommandHandler'
import useDocSocket from './useDocSocket'
import { useRouter } from 'next/router'
import useApplyFormat from './useApplyFormat'
import useHandleSelectionChange from './useHandleSelectionChange'

interface Block {
  id: string
  type: 'text' | 'h1' | 'h2' | 'bullet' | 'checklist'
  content: string
  index: number
}

interface MenuState {
  show: boolean
  position: Position | null
}

const createNewBlockId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const InteractiveDoc: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([{ id: '1', type: 'text', content: '', index: 0 }])
  const [hoverToolbar, setHoverToolbar] = useState<MenuState>({ show: false, position: null })
  const [commandMenu, setCommandMenu] = useState({
    show: false,
    position: null as Position | null,
    filterText: '',
    blockId: undefined as string | undefined
  })

  const selectionStartPosition = useRef<Position | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { slug } = useRouter().query

  const { sendMessage } = useDocSocket({
    detailsId: String(slug),
    onMessageReceived: (content: string) => {
      if (containerRef.current && typeof content === 'string') {
        containerRef.current.innerHTML = content
        updateBlocks()
      }
    }
  })

  const handleDocumentChange = useCallback(() => {
    if (!containerRef.current) return
    sendMessage(containerRef.current.innerHTML)
    updateBlocks()
  }, [sendMessage])

  const updateBlocks = useCallback(() => {
    if (!containerRef.current) return

    const updatedBlocks: Block[] = Array.from(containerRef.current.children).map((element, index) => {
      if (!element.hasAttribute('data-block-id')) {
        element.setAttribute('data-block-id', createNewBlockId())
      }

      const blockType = (): Block['type'] => {
        if (element.querySelector('h1')) return 'h1'
        if (element.querySelector('h2')) return 'h2'
        if (element.querySelector('ul')) return 'bullet'
        if (element.classList.contains('checklist')) return 'checklist'
        return 'text'
      }

      return {
        id: element.getAttribute('data-block-id') || createNewBlockId(),
        type: blockType(),
        content: element.outerHTML,
        index
      }
    })

    if (updatedBlocks.length === 0) {
      updatedBlocks.push({
        id: '1',
        type: 'text',
        content: '<div data-block-id="1"><br></div>',
        index: 0
      })
    }

    setBlocks(updatedBlocks)
    sendMessage(updatedBlocks)
  }, [sendMessage])

  const handleCreateNewBlock = useCallback(() => {
    const selection = window.getSelection()
    if (!selection || !containerRef.current) return

    const newBlockId = createNewBlockId()
    const newBlock = document.createElement('div')
    newBlock.setAttribute('data-block-id', newBlockId)
    newBlock.innerHTML = '<br>'

    const range = selection.getRangeAt(0)
    const currentBlock =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement?.closest('[data-block-id]')
        : (range.startContainer as HTMLElement).closest('[data-block-id]')

    if (currentBlock) {
      currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)

      const newRange = document.createRange()
      newRange.selectNodeContents(newBlock)
      newRange.collapse(true)
      selection.removeAllRanges()
      selection.addRange(newRange)
    }

    updateBlocks()
  }, [updateBlocks])

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
          getCaretPosition(contentDiv) === 0
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
          getCaretPosition(currentListItem) === 0
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

  const getCaretPosition = (element: Node): number => {
    const selection = window.getSelection()
    if (!selection || !selection.rangeCount) return 0

    const range = selection.getRangeAt(0)
    return range.startOffset
  }

  const { handleCommandSelect } = useCommandHandler(setCommandMenu)
  const { applyFormat } = useApplyFormat(setHoverToolbar, selectionStartPosition)
  const { handleSelectionChange } = useHandleSelectionChange(hoverToolbar, setHoverToolbar, selectionStartPosition)

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [handleSelectionChange])

  useEffect(() => {
    if (containerRef.current?.children.length === 0) {
      const div = document.createElement('div')
      div.setAttribute('data-block-id', '1')
      div.innerHTML = '<br>'
      containerRef.current.appendChild(div)
      updateBlocks()
    }
  }, [updateBlocks])

  console.log(blocks, 'blocks')

  return (
    <div className='w-full'>
      <div
        className='text-4xl font-bold text-gray-500 focus:outline-none'
        contentEditable
        suppressContentEditableWarning
      >
        Add page title
      </div>
      <div className='text-lg text-gray-500 focus:outline-none mt-3' contentEditable suppressContentEditableWarning>
        👉 Add a subtitle to let others know how this template should be used
      </div>
      <div
        ref={containerRef}
        className='min-h-[200px] rounded-lg focus:outline-none p-4'
        contentEditable
        suppressContentEditableWarning
        onKeyDown={handleContainerKeyDown}
        onInput={handleDocumentChange}
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
  )
}

export default InteractiveDoc
