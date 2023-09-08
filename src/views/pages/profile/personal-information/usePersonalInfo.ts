import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// import { UserInfoSchema, PasswordSchema } from 'src/@core/validation/UserInfoSchema'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { UserInfo } from 'src/types/User'
import UserService from 'src/services/UserService'

const usePersonalInfo = (userData: UserInfo) => {
  const defaultValues = {
    profile_pic: userData?.information.profile_pic,
    gender: userData?.information.gender,
    birth_date: userData?.information.birth_date,
    identification_number: userData?.information.identification_number,
    driver_license_expiration: userData?.information.driver_license_expiration,
    email: userData?.Email,
    first_name: userData?.information.first_name,
    last_name: userData?.information.last_name,
    Email: userData?.Email,
    phone: userData?.phone
  }

  const dispatch = useDispatch<AppDispatch>()

  const passwordDefaultValues = {
    current_password: '',
    password: '',
    confirm_password: ''
  }

  const {
    control: passwordControl,
    handleSubmit: passwordHandleSubmit,
    formState: passwordState
  } = useForm({
    defaultValues: passwordDefaultValues
    // resolver: yupResolver(PasswordSchema)
  })

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors
  } = useForm({
    defaultValues
    // resolver: yupResolver(UserInfoSchema)
  })

  const userInfoValues: any = useWatch({ control })

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

  return {
    control,
    handleSubmit,
    errors,
    dispatch,
    passwordControl,
    passwordHandleSubmit,
    passwordState,
    userInfoValues,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    updateUserInfo
  }
}

export default usePersonalInfo
