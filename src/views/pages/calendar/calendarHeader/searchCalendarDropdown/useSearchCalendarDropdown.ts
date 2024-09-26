import CalendarService from 'src/services/CalendarService'
import { useQuery } from '@tanstack/react-query'
import useUserData from 'src/hooks/useUserData'
import { useCalendarContext } from 'src/contexts/CalendarContext'

const useSearchCalendarDropdown = () => {
  const { activeWorkspace } = useUserData()
  const { selectedCalendars, addCalendar, removeCalendar } = useCalendarContext()

  const useGetGoogleCalendars = useQuery({
    queryKey: ['googleCalendars'],
    queryFn: () => (activeWorkspace ? getGoogleCalendars('', activeWorkspace?.id) : Promise.resolve({ data: null })),
    enabled: !!activeWorkspace,
    staleTime: Infinity
  })

  const googleCalendarsData = useGetGoogleCalendars.data?.result?.data
  const googleCalendarsDataLoading = useGetGoogleCalendars.isLoading

  // const { fields: selectedCalendars, append: appendSelectedCalendar } = useFieldArray({
  //   control,
  //   name: 'selected_calendars'
  // })

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
    console.error('Error fetching Google events:', error)
    throw error
  }
}
