import { useEffect, useRef } from 'react'

interface DocSocketOptions {
  detailsId: string
  onMessageReceived: (message: any) => void
}

const useDocSocket = ({ detailsId, onMessageReceived }: DocSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket(`wss://api.companyon.ai/details?details_id=${detailsId}`)
    socketRef.current = socket

    socket.onopen = () => {
      console.log('Connected to WebSocket')
    }

    socket.onmessage = event => {
      try {
        const data = JSON.parse(event.data)
        console.log(data,"receivved?")
        onMessageReceived(data)
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
      socketRef.current.send(JSON.stringify(data))
    }
  }

  return { sendMessage }
}

export default useDocSocket
