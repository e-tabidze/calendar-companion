import { useForm, useWatch } from 'react-hook-form'
import { useEffect } from 'react'
import useUserData from 'src/hooks/useUserData'
import CalendarService from 'src/services/CalendarService'
import { format } from 'date-fns'

const useCreateEvent = (selectedDate: Date | null, selectedStartHour: null | number, clickedEvent?: any) => {
  const { primaryCalendar } = useUserData()

  const createEventDefaultValues = {
    title: '',
    description: '',
    selected_date: '',
    meeting_link: false,
    selected_start_hour: '' as any,
    selected_end_hour: '' as any,
    event_color: '',
    all_day: false,
    companion_bot: false,
    selected_calendar: '',
    is_private: false,
    busy: false,
    going: 'yes',
    event_participants: [] as any
  }

  useEffect(() => {
    selectedDate && setValue('selected_date', format(selectedDate, 'yyyy-MM-dd'))
    if (selectedStartHour) {
      const formattedHour = String(selectedStartHour).padStart(2, '0') + ':00'
      setValue('selected_start_hour', formattedHour)
      const selectedEndHour = (selectedStartHour + 1) % 24
      const formattedEndHour = String(selectedEndHour).padStart(2, '0') + ':00'
      setValue('selected_end_hour', formattedEndHour)
    }
    if (primaryCalendar) {
      setValue('selected_calendar', primaryCalendar?.id)
      setValue('event_color', primaryCalendar?.backgroundColor)
    }
    if (clickedEvent) {
      setValue('title', clickedEvent?.summary)
      setValue('description', clickedEvent?.description)
      setValue('selected_date', format(clickedEvent?.start?.dateTime, 'yyyy-MM-dd')),
      setValue('selected_start_hour', new Date(clickedEvent?.start?.dateTime).getHours())
      setValue('selected_end_hour', new Date(clickedEvent?.end?.dateTime).getHours())
    }
  }, [clickedEvent, selectedDate, primaryCalendar])

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    resetField,
    setError,
    clearErrors,
    setValue,
    trigger,
    reset
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: createEventDefaultValues
  })

  const createEventValues: any = useWatch({ control })

  const getParticipants = async (username: string) => {
    try {
      const response: any = await CalendarService.getParticipants('', username)

      return response.data
    } catch (error) {
      throw error
    }
  }

  const postCreateGoogleEvent = async (AccessToken = '', account_id: string, event_data: any) => {
    try {
      const response: any = await CalendarService.postCreateGoogleEvent(AccessToken, account_id, event_data)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  const putUpdateGoogleEvent = async (AccessToken = '', event_id: string, account_id: string, event_data: any) => {
    try {
      const response: any = await CalendarService.putUpdateGoogleEvent(AccessToken, event_id, account_id, event_data)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    createEventValues,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    isValid,
    trigger,
    getParticipants,
    postCreateGoogleEvent,
    reset,
    putUpdateGoogleEvent
  }
}

export default useCreateEvent
