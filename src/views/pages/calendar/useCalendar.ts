import { useQuery } from '@tanstack/react-query'
import CalendarService from 'src/services/CalendarService'

const useCalendar = () => {
  const useGetGoogleEvents: any = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getGoogleEvents('', '737b740e-8b0f-4034-87b2-5af4bd4d1dba', '2024-01-01', '2024-02-02'),
    enabled: true
  })

  const googleEventsData = useGetGoogleEvents.data

  const getGoogleEvents = async (AccessToken = '', workspaceId: string, start_date: string, end_date: string) => {
    try {
      const response: any = await CalendarService.getGoogleEvents(AccessToken, workspaceId, start_date, end_date)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }
  return { googleEventsData }
}

export default useCalendar
