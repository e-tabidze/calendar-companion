import { useFieldArray, useForm, useWatch } from 'react-hook-form'

const useSearch = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onChange'
  })

  const searchValues: any = useWatch({ control })

  const { fields: fuel_types, append: appendFuelType } = useFieldArray({
    control,
    name: 'fuel_types'
  })

  const { fields: category, append: appendCategory } = useFieldArray({
    control,
    name: 'category'
  })

  const { fields: seatTypes, append: appendSeatType } = useFieldArray({
    control,
    name: 'seat_types'
  })

  const { fields: luggageNumbers, append: appendLuggageNumbers } = useFieldArray({
    control,
    name: 'luggage_numbers'
  })

  return {
    control,
    handleSubmit,
    errors,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    searchValues,
    fuel_types,
    appendFuelType,
    category,
    appendCategory,
    seatTypes,
    appendSeatType,
    luggageNumbers,
    appendLuggageNumbers
  }
}

export default useSearch
