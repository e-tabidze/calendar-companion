import { useForm, useWatch } from 'react-hook-form'
import AuthService from 'src/services/AuthService'
import { useEffect } from 'react'

const useGettingStarted = (userData: any) => {
  const gettingStartedDefaultValues = {
    user_information: {
      nickname: '',
      secret_code: '',
      source: '',
      your_role: '',
      use_this_app: ''
    },
    username: '',
    is_active: 1
  }

  useEffect(() => {
    setValue('user_information.nickname', userData ? userData?.information?.nickname : '')
    setValue('user_information.source', userData ? userData?.information?.source : '')
    setValue('user_information.your_role', userData ? userData?.information?.your_role : '')
    setValue('user_information.use_this_app', userData ? userData?.information?.use_this_app : '')
    setValue('user_information.secret_code', userData ? userData?.information?.secret_code : '')
    setValue('username', userData ? userData?.username : '')
  }, [userData])

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

  const putUsers = async (AccessToken = '', id: string, userData: any) => {
    try {
      const response: any = await AuthService.putUsers(AccessToken, id, userData)

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
    putUsers
  }
}

export default useGettingStarted
