import { useQuery } from '@tanstack/react-query'
import CalendarService from 'src/services/CalendarService'
import { useEffect, useState } from 'react'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const useCalendar = (workspaceId?: any, selectedCalendars: string[] = []) => {
  const { startOfPeriod, endOfPeriod, currentPeriod, visibleDays } = useCalendarContext()

  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [syncing, setSyncing] = useState(false)

  const getGoogleEvents = async (AccessToken = '', workspaceId: string, start_date: string, end_date: string, calendarIds: string[] = []) => {
    try {
      const response: any = await CalendarService.getGoogleEvents(AccessToken, workspaceId, start_date, end_date, calendarIds)

      return response.data
    } catch (error) {
      throw error
    }
  }

  console.log(syncing, 'syncing')

  const useGetGoogleEvents = useQuery({
    queryKey: ['calendarEvents', startOfPeriod, endOfPeriod, visibleDays, currentPeriod, selectedCalendars],
    queryFn: () =>
      workspaceId
        ? getGoogleEvents(
            '',
            workspaceId,
            startOfPeriod.toISOString().split('T')[0],
            endOfPeriod.toISOString().split('T')[0],
            selectedCalendars
          )
        : Promise.resolve({ data: null }),
    enabled: !!workspaceId,
    staleTime: Infinity
  })

  const googleEventsData = useGetGoogleEvents.data?.result?.data
  const isLoading = useGetGoogleEvents.isLoading
  const refetchEvents = useGetGoogleEvents.refetch

  console.log(googleEventsData, 'googleEventsData')

  useEffect(() => {
    if (useGetGoogleEvents.isSuccess && googleEventsData && !!workspaceId) {
      const ws = new WebSocket(`wss://api.companyon.ai/ws?workspace_id=${workspaceId}`)

      ws.onopen = () => {
        console.log('Connected to WebSocket server')
      }

      ws.onmessage = event => {
        if (event.data) {
          try {
            const data = JSON.parse(event.data)

            if (data.message == 'sync') {
              setSyncing(true)
            } else if (data.message == 'refetch') {
              useGetGoogleEvents.refetch()
              setSyncing(false)
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

      setSocket(ws)

      return () => {
        ws.close()
      }
    }
  }, [useGetGoogleEvents.isSuccess, googleEventsData])

  return { googleEventsData, socket, isLoading, refetchEvents }
}

export default useCalendar
