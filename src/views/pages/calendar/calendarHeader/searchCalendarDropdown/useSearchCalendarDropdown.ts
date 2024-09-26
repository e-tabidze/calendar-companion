import CalendarService from 'src/services/CalendarService'
import { useQuery } from '@tanstack/react-query'
import useUserData from 'src/hooks/useUserData'

const useSearchCalendarDropdown = () => {
  const { activeWorkspace } = useUserData()

  const useGetGoogleCalendars = useQuery({
    queryKey: ['googleCalendars'],
    queryFn: () => (activeWorkspace ? getGoogleCalendars('', activeWorkspace?.id) : Promise.resolve({ data: null })),
    enabled: !!activeWorkspace,
    staleTime: Infinity
  })

  const googleCalendarsData = useGetGoogleCalendars.data?.result?.data
  const googleCalendarsDataLoading = useGetGoogleCalendars.isLoading


  return {
    googleCalendarsData,
    googleCalendarsDataLoading
  }
}

export default useSearchCalendarDropdown

const getGoogleCalendars = async (AccessToken = '', workspaceId: string) => {
  try {
    const response: any = await CalendarService.getGoogleCalendars(AccessToken, workspaceId)

    return response.data
  } catch (error) {
    throw error
  }
}
