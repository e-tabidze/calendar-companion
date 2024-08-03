import { useForm, useWatch } from 'react-hook-form'
import { RegisterUser } from 'src/types/auth'
import AuthService from 'src/services/AuthService'
import { useQuery } from '@tanstack/react-query'
import Cookie from 'src/helpers/Cookie'

const useGettingStarted = () => {
  const useCheckUser: any = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getCheckUser(''),
    staleTime: Infinity,
    enabled: !!Cookie.get('AccessToken')
  })

  const userData = useCheckUser.data

  console.log(userData, 'checkuserData')

  const gettingStartedDefaultValues = {
    information: {
      nickname: userData ? userData?.information?.nickname : '',
      secret_code: userData ? userData?.information?.secret_code : '',
      source: '',
      your_role: '',
      use_this_app: ''
    },
    username: userData?.username,
    is_active: 1
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
    defaultValues: gettingStartedDefaultValues
  })

  const gettingStartedValues: any = useWatch({ control })

  const getCheckUser = async (AccessToken = '') => {
    try {
      const response: any = await AuthService.getCheckUser(AccessToken)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  const registerUser = async (AccessToken = '', registerUserData: RegisterUser) => {
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
    gettingStartedValues,
    registerUser,
    userData
  }
}

export default useGettingStarted
