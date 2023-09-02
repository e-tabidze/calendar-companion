import { useForm, useWatch } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'
import { User } from 'src/types/AuthContext'

const usePersonalInfo = (userData: User) => {
  const defaultValues = {
    email: userData.Email,
    firstName: userData.FirstName,
    lastName: userData.LastName
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
