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
  const updateThreshold = 500 // ms
  const lastActiveBlockRef = useRef<HTMLElement | null>(null)
  const lastBlockContentRef = useRef<Map<string, string>>(new Map()) // Track by blockId
  const lastBlockUserRef = useRef<Map<string, string>>(new Map()) // Track username by blockId
  
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

  const shouldUpdateBlock = useCallback((blockId: string, content: string, currentUsername: string) => {
    const lastContent = lastBlockContentRef.current.get(blockId)
    const lastUser = lastBlockUserRef.current.get(blockId)
    
    // If this is our block (we created it or last modified it)
    if (!lastUser || lastUser === currentUsername) {
      return !lastContent || lastContent !== content
    }
    
    // If it's someone else's block, don't update unless we're actively changing it
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

    const activeContent = lastActiveBlockRef.current.innerHTML
    if (!shouldUpdateBlock(activeBlockId, activeContent, usernameRef.current)) return

    // Update only if we're modifying the content
    const activeBlock: Block = {
      id: activeBlockId,
      type: 'text',
      content: activeContent,
      index: Array.from(containerRef.current.children).indexOf(lastActiveBlockRef.current),
      username: usernameRef.current
    }

    // Update our tracking refs
    lastBlockContentRef.current.set(activeBlockId, activeContent)
    lastBlockUserRef.current.set(activeBlockId, usernameRef.current)

    // Update local state while preserving other blocks and their usernames
    const allBlocks: Block[] = Array.from(containerRef.current.children).map((child, index) => {
      const blockId = child.getAttribute('data-block-id') || String(index + 1)
      return {
        id: blockId,
        type: 'text',
        content: child.innerHTML,
        index,
        username: getBlockUsername(blockId)
      }
    })

    setBlocks(allBlocks)
    // Send only the modified block
    sendMessage([activeBlock])
  }, [containerRef, setBlocks, sendMessage, getBlockUsername, shouldUpdateBlock])

  const updateBlocks = useCallback(() => {
    if (!containerRef.current) return

    const selection = window.getSelection()
    if (!selection?.rangeCount) return

    const range = selection.getRangeAt(0)
    const currentBlock = range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement?.closest('[data-block-id]')
      : (range.startContainer as HTMLElement).closest('[data-block-id]')

    if (currentBlock instanceof HTMLElement) {
      const blockId = currentBlock.getAttribute('data-block-id')
      if (blockId && shouldUpdateBlock(blockId, currentBlock.innerHTML, usernameRef.current)) {
        lastActiveBlockRef.current = currentBlock
        performUpdate()
      }
    }
  }, [performUpdate, shouldUpdateBlock])

  const handleKeyDown = useCallback(() => {
    if (!containerRef.current) return

    const selection = window.getSelection()
    if (!selection?.rangeCount) return

    const range = selection.getRangeAt(0)
    const currentBlock = range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement?.closest('[data-block-id]')
      : (range.startContainer as HTMLElement).closest('[data-block-id]')

    if (currentBlock instanceof HTMLElement) {
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

  // const handleCreateNewBlock = useCallback(() => {
  //   if (!containerRef.current) return

  //   const selection = window.getSelection()
  //   if (!selection) return

  //   const range = selection.getRangeAt(0)
  //   const currentBlock =
  //     range.startContainer.nodeType === Node.TEXT_NODE
  //       ? range.startContainer.parentElement?.closest('[data-block-id]')
  //       : (range.startContainer as HTMLElement).closest('[data-block-id]')

  //   if (!currentBlock) return

  //   // Create new block with unique ID
  //   const newBlock = document.createElement('div')
  //   const newBlockId = Math.random().toString(36).substr(2, 9)
  //   newBlock.setAttribute('data-block-id', newBlockId)
  //   newBlock.innerHTML = '<br>'

  //   currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)

  //   // Set cursor to new block
  //   const newRange = document.createRange()
  //   newRange.selectNodeContents(newBlock)
  //   newRange.collapse(true)
  //   selection.removeAllRanges()
  //   selection.addRange(newRange)

  //   // Update tracking refs for the new block
  //   lastActiveBlockRef.current = newBlock
  //   lastBlockContentRef.current.set(newBlockId, '<br>')
  //   lastBlockUserRef.current.set(newBlockId, usernameRef.current)

  //   // Only send the new block
  //   const newBlockData: Block = {
  //     id: newBlockId,
  //     type: 'text',
  //     content: '<br>',
  //     index: Array.from(containerRef.current.children).indexOf(newBlock),
  //     username: usernameRef.current
  //   }

  //   sendMessage([newBlockData])
  // }, [containerRef, sendMessage])

  const handleCreateNewBlock = useCallback(() => {
    if (!containerRef.current) return

    const selection = window.getSelection()
    if (!selection) return

    const range = selection.getRangeAt(0)
    const currentBlock =
      range.startContainer.nodeType === Node.TEXT_NODE
        ? range.startContainer.parentElement?.closest('[data-block-id]')
        : (range.startContainer as HTMLElement).closest('[data-block-id]')

    if (!currentBlock) return

    const currentBlockId = currentBlock.getAttribute('data-block-id')
    if (!currentBlockId) return

    // Preserve the current block's content and ownership
    const currentContent = currentBlock.innerHTML
    const currentOwner = lastBlockUserRef.current.get(currentBlockId) || usernameRef.current
    lastBlockContentRef.current.set(currentBlockId, currentContent)
    lastBlockUserRef.current.set(currentBlockId, currentOwner)

    // Create new block with unique ID
    const newBlock = document.createElement('div')
    const newBlockId = Math.random().toString(36).substr(2, 9)
    newBlock.setAttribute('data-block-id', newBlockId)
    newBlock.innerHTML = '<br>'

    currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)

    // Set cursor to new block
    const newRange = document.createRange()
    newRange.selectNodeContents(newBlock)
    newRange.collapse(true)
    selection.removeAllRanges()
    selection.addRange(newRange)

    // Update tracking refs for the new block only
    lastActiveBlockRef.current = newBlock
    lastBlockContentRef.current.set(newBlockId, '<br>')
    lastBlockUserRef.current.set(newBlockId, usernameRef.current)

    // Update local state while preserving ownership of all blocks
    const allBlocks: Block[] = Array.from(containerRef.current.children).map((child, index) => {
      const blockId = child.getAttribute('data-block-id') || String(index + 1)
      return {
        id: blockId,
        type: 'text',
        content: child.innerHTML,
        index,
        username: lastBlockUserRef.current.get(blockId) || getBlockUsername(blockId)
      }
    })

    setBlocks(allBlocks)

    // Only send the new block with current user's ownership
    const newBlockData: Block = {
      id: newBlockId,
      type: 'text',
      content: '<br>',
      index: Array.from(containerRef.current.children).indexOf(newBlock),
      username: usernameRef.current
    }

    sendMessage([newBlockData])
}, [containerRef, sendMessage, getBlockUsername])

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