import { useForm, useWatch } from 'react-hook-form'
import { useEffect } from 'react'

const useCreateEvent = (selectedDate: Date | null) => {
  const createEventDefaultValues = {
    title: '',
    description: '',
    selected_date: new Date()
  }

  useEffect(() => {
    if (selectedDate) {
      setValue('selected_date', selectedDate)
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
