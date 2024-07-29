import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema } from 'src/@core/validation/RegisterSchema'

const useRegister = () => {
  const registerDefaultValues = {
    email: '',
    password: '',
    repeat_password: '',
    terms_and_conditions: '',
    confirmation_url: ''
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
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: registerDefaultValues,
    resolver: yupResolver(RegisterSchema)
  })

  return { control, handleSubmit, errors, dirtyFields, resetField, setError, clearErrors, setValue, trigger }
}

export default useRegister
