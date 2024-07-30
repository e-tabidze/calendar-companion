import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema } from 'src/@core/validation/RegisterSchema'

const useRegister = () => {
  const registerDefaultValues = {
    email: '',
    password: '',
    repeat_password: '',
    terms_and_conditions: '',
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
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: registerDefaultValues,
    resolver: yupResolver(RegisterSchema)
  })

  const registerValues: any = useWatch({ control })

  return {
    control,
    handleSubmit,
    errors,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    trigger,
    registerValues
  }
}

export default useRegister
