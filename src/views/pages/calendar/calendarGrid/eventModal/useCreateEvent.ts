import { useForm, useWatch } from 'react-hook-form'
import { useEffect } from 'react'
import useUserData from 'src/hooks/useUserData'

const useCreateEvent = (selectedDate: Date | null, selectedStartHour: null | number) => {
  const { primaryCalendar } = useUserData()

  const createEventDefaultValues = {
    title: '',
    description: '',
    selected_date: new Date(),
    meeting_link: false,
    selected_start_hour: '',
    selected_end_hour: '',
    event_color: '',
    all_day: false,
    companion_bot: false,
    selected_calendar: '',
    is_private: false,
    busy: false,
    going: 'yes'
  }

  useEffect(() => {
    selectedDate && setValue('selected_date', selectedDate)
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
  }, [selectedDate, primaryCalendar])

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    resetField,
    setError,
    clearErrors,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: createEventDefaultValues
  })

  const createEventValues: any = useWatch({ control })

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
    trigger
  }
}

export default useCreateEvent
