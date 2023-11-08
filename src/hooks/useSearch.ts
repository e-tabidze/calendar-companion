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
    appendCategory
  }
}

export default useSearch
