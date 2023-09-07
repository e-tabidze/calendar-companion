import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// import { UserInfoSchema, PasswordSchema } from 'src/@core/validation/UserInfoSchema'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { UserInfo } from 'src/types/User'

const usePersonalInfo = (userData: UserInfo) => {
  const defaultValues = {
    gender: userData?.gender_id,
    email: userData?.Email,
    first_name: userData?.FirstName,
    last_name: userData?.LastName,
    phone: userData?.phone,
    code: ''
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
    clearErrors
  }
}

export default usePersonalInfo
