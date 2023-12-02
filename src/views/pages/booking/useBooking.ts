import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { BookingSchema } from 'src/@core/validation/bookingSchema'
import useProfile from 'src/hooks/useProfile'
import { useEffect } from 'react'
import { Booking } from 'src/types/Booking'

const useBooking = () => {
  const { userInfo } = useProfile()

  const defaultValues: Booking = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    identification_number: '',
    booking: {
      book_from: '',
      book_to: ''
    },
    birth_date: null,
    driver_license_expiration: null,
    additional_services: [] as any[],
  }

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,

    // @ts-ignore
    resolver: yupResolver(BookingSchema)
  })

  const bookingValues: any = useWatch({ control })

  useEffect(() => {
    if (!!userInfo) {
      setValue('first_name', userInfo?.UserID === userInfo?.active_profile_id ? userInfo?.information?.first_name : '')
      setValue('last_name', userInfo?.UserID === userInfo?.active_profile_id ? userInfo?.information?.last_name : '')
      setValue(
        'identification_number',
        userInfo?.UserID === userInfo?.active_profile_id ? userInfo?.information?.identification_number : ''
      )
      setValue('email', userInfo?.UserID === userInfo?.active_profile_id ? userInfo?.Email : '')
      setValue('phone', userInfo?.UserID === userInfo?.active_profile_id ? userInfo?.phone : '')
      setValue(
        'birth_date',
        userInfo?.UserID === userInfo?.active_profile_id ? userInfo?.information?.birth_date : null
      )
      setValue(
        'driver_license_expiration',
        userInfo?.UserID === userInfo?.active_profile_id ? userInfo?.information?.driver_license_expiration : null
      )
    }
  }, [userInfo, setValue])

  const { fields: additionalServices, append: appendAdditionalService } = useFieldArray({
    control,
    name: 'additional_services'
  })

  return {
    control,
    handleSubmit,
    errors,
    bookingValues,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    additionalServices,
    appendAdditionalService
  }
}

export default useBooking
