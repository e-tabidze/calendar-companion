import { useForm, useWatch } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

const useCreateCompany = () => {
  const dispatch = useDispatch<AppDispatch>()

  const companyInfoDefaultValues = {
    name: '',
    description: '',
    logo: '',
    address: ''
  }

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors
  } = useForm({
    defaultValues: companyInfoDefaultValues
  })

  const companyValues: any = useWatch({ control })

  return {
    control,
    handleSubmit,
    errors,
    dispatch,
    companyValues,
    dirtyFields,
    resetField,
    setError,
    clearErrors
  }
}

export default useCreateCompany
