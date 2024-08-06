import { useQuery } from '@tanstack/react-query'
import AuthService from 'src/services/AuthService'

const useConnectGoogleAccount = (account_id: string | null) => {
  const getGoogleCalendarList = async ({ queryKey }: any) => {
    const [, AccessToken, id] = queryKey
    try {
      const response: any = await AuthService.getGoogleListCalendars(AccessToken, id)
      
      return response.data
    } catch (error) {
      console.error('Error fetching Google Calendars:', error)
      throw error
    }
  }

  const postGoogleCalendars = async (AccessToken = '', account_id: string, calendar: any) => {
    try {
      const response: any = await AuthService.postGoogleCalendars(AccessToken, account_id, calendar)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  const fetchListGoogleCalendar = useQuery({
    queryKey: ['googleCalendarList', '', account_id],
    queryFn: getGoogleCalendarList,
    enabled: !!account_id,
    staleTime: Infinity
  })

  const googleCalendarList = fetchListGoogleCalendar.data?.result?.data?.items
  const refetchGoogleCalendarList = fetchListGoogleCalendar.refetch

  console.log(googleCalendarList, 'googleCalendarList')

  return {
    googleCalendarList,
    refetchGoogleCalendarList,
    postGoogleCalendars
  }
}

export default useConnectGoogleAccount
