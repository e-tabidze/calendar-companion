import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { RegisterSchema } from 'src/@core/validation/RegisterSchema'
import { AuthUser } from 'src/types/auth'
import AuthService from 'src/services/AuthService'

const useRegister = () => {
  const registerDefaultValues = {
    username: '',
    password: '',
    repeat_password: '',
    terms_and_conditions: ''
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
    reValidateMode: 'onChange',
    defaultValues: registerDefaultValues,
    resolver: yupResolver(RegisterSchema, { abortEarly: false })
  })

  const registerValues: any = useWatch({ control })

  const registerUser = async (AccessToken = '', registerUserData: AuthUser) => {
    try {
      const response: any = await AuthService.postRegister(AccessToken, registerUserData)

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
    registerValues,
    registerUser
  }
}

export default useRegister
