import { useEffect, useRef, useState } from 'react'

export interface DocSocketOptions {
  detailsId: string
  onMessageReceived: (message: any) => void
}

const useDocSocket = ({ detailsId, onMessageReceived }: DocSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null)
  const [reconnectAttempts, setReconnectAttempts] = useState(0)

  useEffect(() => {
    let reconnectTimeout: NodeJS.Timeout

    const connectWebSocket = () => {
      const socket = new WebSocket(`ws://127.0.0.1:5005/details?details_id=${detailsId}`)
      socketRef.current = socket

      socket.onopen = () => {
        console.log('WebSocket connection established')
        setReconnectAttempts(0) 
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log(data, 'data')
        onMessageReceived(data)
      }

      socket.onclose = (event) => {
        console.log(`WebSocket closed with code: ${event.code}, reason: ${event.reason}`)

        if (event.code !== 1000 && reconnectAttempts < 5) {
          console.log('Attempting to reconnect...')
          reconnectTimeout = setTimeout(() => {
            setReconnectAttempts(reconnectAttempts + 1)
            connectWebSocket()
          }, 3000)
        }
      }

      socket.onerror = (error) => {
        console.error('WebSocket error:', error)
      }
    }

    connectWebSocket()

    return () => {
      clearTimeout(reconnectTimeout)
      socketRef.current?.close(1000, 'Client closing connection')
    }
  }, [])

  const sendMessage = (data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data))
    }
  }

  return { sendMessage }
}

export default useDocSocket
