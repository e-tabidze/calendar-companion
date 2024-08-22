import { useQuery } from '@tanstack/react-query'
import CalendarService from 'src/services/CalendarService'
import { useEffect, useState } from 'react'

const useCalendar = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null)

  const getGoogleEvents = async (AccessToken = '', workspaceId: string, start_date: string, end_date: string) => {
    try {
      const response: any = await CalendarService.getGoogleEvents(AccessToken, workspaceId, start_date, end_date)

      return response.data
    } catch (error) {
      console.error('Error fetching Google events:', error)
      throw error
    }
  }

  const useGetGoogleEvents = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getGoogleEvents('', '737b740e-8b0f-4034-87b2-5af4bd4d1dba', '2024-01-01', '2024-02-02'),
    enabled: true
  })

  const googleEventsData = useGetGoogleEvents.data

  useEffect(() => {
    if (useGetGoogleEvents.isSuccess && googleEventsData) {
      const ws = new WebSocket(`ws://localhost:5000/ws?workspace_id=737b740e-8b0f-4034-87b2-5af4bd4d1dba`)

      ws.onopen = () => {
        console.log('Connected to WebSocket server')
      }

      ws.onmessage = (event) => {
        console.log('Received data from WebSocket:', event.data)
        useGetGoogleEvents.refetch()
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
      }

      ws.onclose = () => {
        console.log('Disconnected from WebSocket server')
      }

      // Save the socket connection to the state
      setSocket(ws)

      // Cleanup on component unmount
      return () => {
        ws.close()
      }
    }
  }, [useGetGoogleEvents.isSuccess, googleEventsData])

  return { googleEventsData, socket }
}

export default useCalendar
