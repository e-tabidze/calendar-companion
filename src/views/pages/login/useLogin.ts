import { useForm, useWatch } from 'react-hook-form'

const useLogin = () => {
  const loginDefaultValues = {
    email: '',
    password: '',
    remember_account: '',
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
    defaultValues: loginDefaultValues,
  })

  const loginValues: any = useWatch({ control })

  return {
    control,
    handleSubmit,
    errors,
    dirtyFields,
    isValid,
    resetField,
    setError,
    clearErrors,
    setValue,
    trigger,
    loginValues
  }
}

export default useLogin
