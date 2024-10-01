import { useForm, useWatch } from 'react-hook-form'
import { useEffect } from 'react'

const useCreateEvent = (selectedDate: Date | null, selectedStartHour: null | number) => {
  const createEventDefaultValues = {
    title: '',
    description: '',
    selected_date: new Date(),
    selected_start_hour: '',
    selected_end_hour: ''
  }

  useEffect(() => {
    selectedDate && setValue('selected_date', selectedDate)
    if (selectedStartHour) {
      const formattedHour = String(selectedStartHour).padStart(2, '0') + ':00'
      setValue('selected_start_hour', formattedHour)
      const selectedEndHour = (selectedStartHour + 1) % 24 // Ensure it wraps around after 23
      const formattedEndHour = String(selectedEndHour).padStart(2, '0') + ':00'
      setValue('selected_end_hour', formattedEndHour)
    }
  }, [selectedDate])

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
