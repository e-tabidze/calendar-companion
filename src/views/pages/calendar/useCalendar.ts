import { useQuery } from '@tanstack/react-query'
import CalendarService from 'src/services/CalendarService'
import { useEffect, useState } from 'react'

const useCalendar = (workspaceId: any) => {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [syncing, setSyncing] = useState(false)

  const getGoogleEvents = async (AccessToken = '', workspaceId: string, start_date: string, end_date: string) => {
    try {
      const response: any = await CalendarService.getGoogleEvents(AccessToken, workspaceId, start_date, end_date)

      return response.data
    } catch (error) {
      console.error('Error fetching Google events:', error)
      throw error
    }
  }

  console.log(syncing, 'workspaceId')

  const useGetGoogleEvents = useQuery({
    queryKey: ['calendarEvents'],
    queryFn: () => workspaceId ?  getGoogleEvents('', workspaceId, '', '') : Promise.resolve({ data: null }),
    enabled: !!workspaceId
  })

  const googleEventsData = useGetGoogleEvents.data?.result?.data
  const isLoading = useGetGoogleEvents.isLoading

  useEffect(() => {
    if (useGetGoogleEvents.isSuccess && googleEventsData && !!workspaceId) {
      const ws = new WebSocket(`wss://api.companyon.ai/ws?workspace_id=${workspaceId}`)

      ws.onopen = () => {
        console.log('Connected to WebSocket server')
      }

      ws.onmessage = event => {
        if (event.data) {
          try {
            const data = JSON.parse(event.data) // Parse the JSON data

            if (data.message == 'sync') {
              setSyncing(true) // Assuming you have a `setSyncing` state handler
            } else if (data.message == 'refetch') {
              useGetGoogleEvents.refetch()
              setSyncing(false) // Assuming you have a `setSyncing` state handler
              // Refetch the events if message is 'refetch'
            }
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error)
          }
        }
      }

      ws.onerror = error => {
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

  return { googleEventsData, socket, isLoading }
}

export default useCalendar
