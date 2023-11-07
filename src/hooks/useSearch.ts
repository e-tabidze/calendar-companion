import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ProductService from 'src/services/ProductService'
import { useEffect } from 'react'
import useProfile from 'src/hooks/useProfile'
import searchService from 'src/services/searchService'
import { useQuery } from '@tanstack/react-query'

const useSearch = () => {
  const defaultValues = {}

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues
  })

  const searchValues: any = useWatch({ control })

  return {
    control,
    handleSubmit,
    errors,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    searchValues
  }
}

export default useSearch
