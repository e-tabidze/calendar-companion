import { useEffect, useRef } from 'react'

interface DocSocketOptions {
  detailsId: string
  onMessageReceived: (message: any) => void
}

const useDocSocket = ({ detailsId, onMessageReceived }: DocSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null)
  const lastSentUpdatesRef = useRef<{[key: number]: string}>({}) // Track by index

  useEffect(() => {
    const socket = new WebSocket(`ws://127.0.0.1:5050/details?details_id=${detailsId}`)
    socketRef.current = socket

    socket.onopen = () => {
      console.log('Connected to WebSocket')
    }

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data)
        
        // If it's an array of updates, check each one against lastSentUpdates
        if (Array.isArray(data)) {
          const hasNewUpdates = data.some(update => {
            const lastSentContent = lastSentUpdatesRef.current[update.index]
            return !lastSentContent || lastSentContent !== update.content
          })

          if (hasNewUpdates) {
            console.log(data, "received?")
            onMessageReceived(data)
          }
        } else {
          onMessageReceived(data)
        }
      } catch (error) {
        console.error('Error parsing message:', error)
      }
    }

    socket.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      socket.close()
    }
  }, [detailsId])

  const sendMessage = (data: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      if (Array.isArray(data)) {
        // Update lastSentUpdates with new content for each index
        data.forEach(update => {
          lastSentUpdatesRef.current[update.index] = update.content
        })
      }
      socketRef.current.send(JSON.stringify(data))
    }
  }

  return { sendMessage }
}

export default useDocSocket