import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { BookingSchema } from 'src/@core/validation/bookingSchema'
import useProfile from 'src/hooks/useProfile'
import { useEffect } from 'react'
import { Booking } from 'src/types/Booking'
import useSingleProductDetails from '../details/useSingleProductDetails'

const useBooking = (id: number | string | string[]) => {
  const { userInfo } = useProfile()
  const { singleProductDetails } = useSingleProductDetails(id)

  const additionalService = singleProductDetails?.product_services.map(service => ({
    id: service.id,
    count: 0,
    is_selected: false,
    description: service.description,
    title: service?.title,
    type: service?.company_service_type_id,
    price: service?.price
  }))

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
    additional_services: additionalService,
    supply: '0',
    start_time: '',
    end_time: '',
    start_address: singleProductDetails?.start_address,
    end_address: singleProductDetails?.end_address
  }

  console.log(singleProductDetails, 'singleCompanyBranches in booking')
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
      setValue('start_address', singleProductDetails ? singleProductDetails?.start_address : '')
      setValue('end_address', singleProductDetails ? singleProductDetails?.end_address : '')
      setValue('additional_services', singleProductDetails ? additionalService : [])
    }
  }, [userInfo, setValue, singleProductDetails])

  console.log(singleProductDetails?.start_address, 'singleProductDetails?.start_address')

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
