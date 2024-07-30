import { useForm, useWatch } from 'react-hook-form'

const useResetPassword = () => {
  const resetPasswordDefaultValues = {
    email: '',
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
    defaultValues: resetPasswordDefaultValues,
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

export default useResetPassword
