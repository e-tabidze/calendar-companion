import { useFieldArray, useForm, useWatch } from 'react-hook-form'
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

  const selectCalendarsDefauktValues = {
    selected_calendars: [] as any
  }

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    trigger,
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: selectCalendarsDefauktValues
  })

  const { fields: selectedCalendars, append: appendSelectedCalendar } = useFieldArray({
    control,
    name: 'selected_calendars'
  })

  const selectedCalendarsValues: any = useWatch({ control })

  return {
    control,
    handleSubmit,
    errors,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    googleCalendarsData,
    selectedCalendarsValues,
    selectedCalendars,
    appendSelectedCalendar,
    isValid,
    trigger,
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
