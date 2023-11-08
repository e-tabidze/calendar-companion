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

  const {
    fields: fuel_types,
    append: appendFuelType,
    remove: removeFuelType
  } = useFieldArray({
    control,
    name: 'fuel_types',
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
    removeFuelType
  }
}

export default useSearch
