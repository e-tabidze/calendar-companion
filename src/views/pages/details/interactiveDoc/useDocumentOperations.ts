import { useCallback, useEffect, useRef } from 'react'
import { Block } from './types'

interface DocumentOperationsProps {
  containerRef: React.RefObject<HTMLDivElement>
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>
  sendMessage: (content: string | Block[]) => void
}

export const useDocumentOperations = ({
  containerRef,
  setBlocks,
  sendMessage
}: DocumentOperationsProps) => {
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateTime = useRef<number>(0)
  const updateThreshold = 500 // ms

  // Add these refs for typing detection
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const isTypingRef = useRef(false)
  const isSentRef = useRef(false)

  const cleanupTypingInterval = useCallback(() => {
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
      typingIntervalRef.current = null
    }
  }, [])

  const handleKeyDown = useCallback(() => {
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
  }, [])

  const updateBlocks = useCallback(() => {
    if (!containerRef.current) return

    const now = Date.now()
    if (now - lastUpdateTime.current < updateThreshold) {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
      
      updateTimeoutRef.current = setTimeout(() => {
        performUpdate()
      }, updateThreshold)
      
      return
    }

    performUpdate()
  }, [])

  const performUpdate = useCallback(() => {
    if (!containerRef.current) return
    
    lastUpdateTime.current = Date.now()
    
    const blocks: Block[] = Array.from(containerRef.current.children).map((child, index) => {
      const blockId = child.getAttribute('data-block-id') || String(index + 1)
      return {
        id: blockId,
        type: 'text',
        content: child.innerHTML,
        index
      }
    })

    setBlocks(blocks)
    sendMessage(blocks)
  }, [containerRef, setBlocks, sendMessage])

  const handleCreateNewBlock = useCallback(() => {
    if (!containerRef.current) return

    const selection = window.getSelection()
    if (!selection) return

    const range = selection.getRangeAt(0)
    const currentBlock = range.startContainer.nodeType === Node.TEXT_NODE
      ? range.startContainer.parentElement?.closest('[data-block-id]')
      : (range.startContainer as HTMLElement).closest('[data-block-id]')

    if (!currentBlock) return

    const newBlock = document.createElement('div')
    const newBlockId = Math.random().toString(36).substr(2, 9)
    newBlock.setAttribute('data-block-id', newBlockId)
    newBlock.innerHTML = '<br>'

    currentBlock.parentNode?.insertBefore(newBlock, currentBlock.nextSibling)

    const newRange = document.createRange()
    newRange.selectNodeContents(newBlock)
    newRange.collapse(true)
    selection.removeAllRanges()
    selection.addRange(newRange)

    updateBlocks()
  }, [containerRef, updateBlocks])

  // Cleanup on unmount
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