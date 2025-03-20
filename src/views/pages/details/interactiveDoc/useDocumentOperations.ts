import { useCallback, useEffect, useRef } from 'react'
import { Block } from './types'

interface DocumentOperationsProps {
  containerRef: React.RefObject<HTMLDivElement>
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
  sendMessage: (content: string | Block[]) => void
  username: string
}

export const useDocumentOperations = ({ containerRef, setBlocks, sendMessage, username }: DocumentOperationsProps) => {
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateTime = useRef<number>(0)
  const updateThreshold = 500
  const lastActiveBlockRef = useRef<HTMLElement | null>(null)
  const lastBlockContentRef = useRef<Map<string, string>>(new Map())
  const lastBlockUserRef = useRef<Map<string, string>>(new Map())

  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isTypingRef = useRef(false)
  const isSentRef = useRef(false)
  const usernameRef = useRef(username)

  useEffect(() => {
    usernameRef.current = username
  }, [username])

  const cleanupTypingInterval = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
      typingIntervalRef.current = null
    }
  }, [])

  const getBlockUsername = useCallback((blockId: string) => {
    return lastBlockUserRef.current.get(blockId) || usernameRef.current
  }, [])

  const getContentElement = useCallback((block: HTMLElement): HTMLElement | null => {
    const contentColumn = block.children[2] as HTMLElement
    if (!contentColumn) return null

    const contentElement = contentColumn.querySelector('[contenteditable]') as HTMLElement
    return contentElement
  }, [])

  const getBlockContent = useCallback(
    (block: HTMLElement): string => {
      const contentElement = getContentElement(block)
      return contentElement ? contentElement.innerHTML : '<br>'
    },
    [getContentElement]
  )

  const shouldUpdateBlock = useCallback((blockId: string, content: string, currentUsername: string) => {
    const lastContent = lastBlockContentRef.current.get(blockId)
    const lastUser = lastBlockUserRef.current.get(blockId)

    if (!lastUser || lastUser === currentUsername) {
      return !lastContent || lastContent !== content
    }

    return lastContent !== content && lastActiveBlockRef.current?.getAttribute('data-block-id') === blockId
  }, [])

  const performUpdate = useCallback(() => {
    if (!containerRef.current || !lastActiveBlockRef.current) return

    const now = Date.now()
    if (now - lastUpdateTime.current < updateThreshold) {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
      updateTimeoutRef.current = setTimeout(performUpdate, updateThreshold)

      return
    }

    lastUpdateTime.current = now
    const activeBlockId = lastActiveBlockRef.current.getAttribute('data-block-id')
    if (!activeBlockId) return

    const activeContent = getBlockContent(lastActiveBlockRef.current)
    if (!shouldUpdateBlock(activeBlockId, activeContent, usernameRef.current)) return

    const activeBlock: Block = {
      id: activeBlockId,
      type: 'text',
      content: activeContent,
      index: Array.from(containerRef.current.children).indexOf(lastActiveBlockRef.current),
      username: usernameRef.current
    }

    lastBlockContentRef.current.set(activeBlockId, activeContent)
    lastBlockUserRef.current.set(activeBlockId, usernameRef.current)

    const allBlocks: Block[] = Array.from(containerRef.current.children).map((child, index) => {
      const blockId = child.getAttribute('data-block-id') || String(index + 1)
      const blockContent = getBlockContent(child as HTMLElement)

      return {
        id: blockId,
        type: 'text',
        content: blockContent,
        index,
        username: getBlockUsername(blockId)
      }
    })

    setBlocks(allBlocks)

    sendMessage([activeBlock])
  }, [containerRef, setBlocks, sendMessage, getBlockUsername, shouldUpdateBlock, getBlockContent])

  const updateBlocks = useCallback(() => {
    if (!containerRef.current) return

    const selection = window.getSelection()
    if (!selection?.rangeCount) return

    const range = selection.getRangeAt(0)

    const currentBlock = (
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement?.closest('[data-block-id]')
        : (range.startContainer as HTMLElement).closest('[data-block-id]')
    ) as HTMLElement | null

    if (currentBlock) {
      const blockId = currentBlock.getAttribute('data-block-id')
      const blockContent = getBlockContent(currentBlock)

      if (blockId && shouldUpdateBlock(blockId, blockContent, usernameRef.current)) {
        lastActiveBlockRef.current = currentBlock
        performUpdate()
      }
    }
  }, [performUpdate, shouldUpdateBlock, getBlockContent])

  const handleKeyDown = useCallback(() => {
    if (!containerRef.current) return

    const selection = window.getSelection()
    if (!selection?.rangeCount) return

    const range = selection.getRangeAt(0)

    const currentBlock = (
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement?.closest('[data-block-id]')
        : (range.startContainer as HTMLElement).closest('[data-block-id]')
    ) as HTMLElement | null

    if (currentBlock) {
      lastActiveBlockRef.current = currentBlock
    }

    isTypingRef.current = true
    isSentRef.current = false
    cleanupTypingInterval()
  }, [cleanupTypingInterval])

  const handleKeyUp = useCallback(() => {
    cleanupTypingInterval()

    typingIntervalRef.current = setInterval(() => {
      if (!isSentRef.current && isTypingRef.current) {
        performUpdate()
        isSentRef.current = true
        isTypingRef.current = false
      }
    }, 300)
  }, [cleanupTypingInterval, performUpdate])

  const handleCreateNewBlock = useCallback(
    (index?: number) => {
      if (!containerRef.current) return

      let insertAtIndex = index
      let currentBlock: HTMLElement | null = null

      if (insertAtIndex === undefined) {
        const selection = window.getSelection()
        if (!selection) return

        const range = selection.getRangeAt(0)
        currentBlock = (
          range.startContainer.nodeType === Node.TEXT_NODE
            ? range.startContainer.parentElement?.closest('[data-block-id]')
            : (range.startContainer as HTMLElement).closest('[data-block-id]')
        ) as HTMLElement | null

        if (!currentBlock) return

        insertAtIndex = Array.from(containerRef.current.children).indexOf(currentBlock) + 1
      }

      if (currentBlock) {
        const currentBlockId = currentBlock.getAttribute('data-block-id')
        if (currentBlockId) {
          const currentContent = getBlockContent(currentBlock)
          const currentOwner = lastBlockUserRef.current.get(currentBlockId) || usernameRef.current
          lastBlockContentRef.current.set(currentBlockId, currentContent)
          lastBlockUserRef.current.set(currentBlockId, currentOwner)
        }
      }

      const newBlockId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15)

      const blockContainer = document.createElement('div')
      blockContainer.className = 'flex items-center relative py-2'
      blockContainer.setAttribute('data-block-id', newBlockId)
      blockContainer.setAttribute('data-block-index', String(insertAtIndex))

      const timeColumn = document.createElement('div')
      timeColumn.className = 'presentation-only flex-shrink-0 text-sm text-gray-500 absolute -left-[100px]'
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const ampm = hours >= 12 ? 'pm' : 'am'
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12
      const formattedMinutes = minutes.toString().padStart(2, '0')
      const timeString = `${formattedHours}:${formattedMinutes}${ampm}`

      timeColumn.textContent = timeString

      const avatar = document.createElement('div')
      let initial = '?'
      if (usernameRef.current) {
        initial = usernameRef.current.charAt(0).toUpperCase()
      }
      const isT = initial === 'T'
      avatar.className = `presentation-only w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white absolute -left-[47px] z-10 ${
        isT ? 'bg-indigo-800' : 'bg-gray-800'
      }`
      avatar.textContent = initial

      const contentColumn = document.createElement('div')
      contentColumn.className = 'flex-1'

      const contentDiv = document.createElement('div')
      contentDiv.setAttribute('contenteditable', 'true')
      contentDiv.innerHTML = '<br>'
      contentColumn.appendChild(contentDiv)

      blockContainer.appendChild(timeColumn)
      blockContainer.appendChild(avatar)
      blockContainer.appendChild(contentColumn)

      if (insertAtIndex < containerRef.current.children.length) {
        containerRef.current.insertBefore(blockContainer, containerRef.current.children[insertAtIndex])
      } else {
        containerRef.current.appendChild(blockContainer)
      }

      setTimeout(() => {
        const selection = window.getSelection()
        if (selection) {
          const range = document.createRange()
          range.selectNodeContents(contentDiv)
          range.collapse(true)
          selection.removeAllRanges()
          selection.addRange(range)
          contentDiv.focus()
        }
      }, 0)

      lastActiveBlockRef.current = blockContainer
      lastBlockContentRef.current.set(newBlockId, '<br>')
      lastBlockUserRef.current.set(newBlockId, usernameRef.current)

      const allBlocks: Block[] = Array.from(containerRef.current.children).map((child, idx) => {
        const blockId = child.getAttribute('data-block-id') || String(idx + 1)
        const blockContent = getBlockContent(child as HTMLElement)

        return {
          id: blockId,
          type: 'text',
          content: blockContent,
          index: idx,
          username: lastBlockUserRef.current.get(blockId) || getBlockUsername(blockId)
        }
      })

      setBlocks(allBlocks)

      const newBlockData: Block = {
        id: newBlockId,
        type: 'text',
        content: '<br>',
        index: insertAtIndex,
        username: usernameRef.current
      }

      sendMessage([newBlockData])

      return blockContainer
    },
    [containerRef, sendMessage, getBlockUsername, getBlockContent]
  )

  useEffect(() => {
    return () => {
      cleanupTypingInterval()
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [cleanupTypingInterval])

  return {
    updateBlocks,
    handleCreateNewBlock,
    handleKeyDown,
    handleKeyUp
  }
}
