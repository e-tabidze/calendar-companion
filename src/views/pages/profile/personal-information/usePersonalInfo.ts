import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserInfo } from 'src/types/User'
import UserService from 'src/services/UserService'
import { PasswordSchema, UserInfoSchema } from 'src/@core/validation/userInfoSchema'
import useProfile from 'src/hooks/useProfile'
import StaticService from 'src/services/StaticService'

const usePersonalInfo = (userData: UserInfo) => {
  const { userInfo } = useProfile()
  const defaultValues = {
    profile_pic: userData?.information?.profile_pic,
    gender: userData?.information?.gender || userInfo?.gender_id,
    birth_date: userData?.information?.birth_date,
    identification_number: userData?.information?.identification_number,
    driver_license_expiration: userData?.information?.driver_license_expiration,
    email: userData?.Email || userInfo?.Email,
    first_name: userData?.information?.first_name || userInfo?.FirstName,
    last_name: userData?.information?.last_name || userInfo?.LastName,
    Email: userData?.Email,
    phone: userData?.information?.phone || userInfo?.phone
  }

  const passwordDefaultValues = {
    current_password: '',
    password: '',
    confirm_password: ''
  }

  const {
    control: passwordControl,
    formState: { errors: passwordErrors }
  } = useForm({
    defaultValues: passwordDefaultValues,
    mode: 'onChange',
    resolver: yupResolver(PasswordSchema)
  })

  const {
    control: userInfoControl,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors,
    reset
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(UserInfoSchema) as any
  })

  const userInfoValues: any = useWatch({ control: userInfoControl })
  const passwordValues: any = useWatch({ control: passwordControl })

  const updateUserInfo = async (params: { AccessToken: any; userInfo: UserInfo }) => {
    const { AccessToken, userInfo } = params

    try {
      const response: any = await UserService.updateUserInfo(AccessToken, userInfo)

      return response.data
    } catch (error) {
      console.error('Error updating user info:', error)
      throw error
    }
  }

  const changeUserPassword = async (AccessToken: '', passwordInfo: any) => {
    try {
      const response: any = await UserService.changeUserPassword(AccessToken, passwordInfo)

      return response.data
    } catch (error) {
      console.error('Error updating user info:', error)
      throw error
    }
  }

  const uploadProfileImage = async (File: any) => {
    try {
      const response: any = await StaticService.uploadProfileImage('', File)

      return response.data
    } catch (error) {
      console.error('Error fetching location suggestions:', error)
      throw error
    }
  }

  const saveProfileImage = async (Photo: any) => {
    try {
      const response: any = await StaticService.saveProfileImage('', Photo)

      return response.data
    } catch (error) {
      console.error('Error fetching location suggestions:', error)
      throw error
    }
  }

  return {
    userInfoControl,
    handleSubmit,
    errors,
    reset,
    passwordControl,
    passwordErrors,
    userInfoValues,
    passwordValues,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    updateUserInfo,
    changeUserPassword,
    uploadProfileImage,
    saveProfileImage
  }
}

export default usePersonalInfo
