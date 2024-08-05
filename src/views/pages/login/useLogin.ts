import { useForm, useWatch } from 'react-hook-form'
import AuthService from 'src/services/AuthService'
import { AuthUser } from 'src/types/auth'

const useLogin = () => {
  const loginDefaultValues = {
    username: '',
    password: '',
    remember_account: ''
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
    defaultValues: loginDefaultValues
  })

  const loginValues: any = useWatch({ control })

  const signin = async (signInData: AuthUser) => {
    try {
      const response: any = await AuthService.postSignIn('', signInData)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

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
    loginValues,
    signin
  }
}

export default useLogin
