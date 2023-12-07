import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { BookingSchema } from 'src/@core/validation/bookingSchema'
import useProfile from 'src/hooks/useProfile'
import { useEffect } from 'react'
import { Order } from 'src/types/Order'
import useSingleProductDetails from '../details/useSingleProductDetails'
import { useRouter } from 'next/router'
import { Service } from 'src/types/Product'
import OrderService from 'src/services/OrderService'

const useBooking = (id: number | string | string[]) => {
  const { userInfo } = useProfile()
  const { singleProductDetails } = useSingleProductDetails(id)
  const router = useRouter()
  const { book_from, book_to } = router.query

  console.log(singleProductDetails?.product_services, 'singleProductDetails?.product_services')

  const additionalService = singleProductDetails?.product_services.map((service: Service) => ({
    id: service.id | 0,
    count: 0,
    is_selected: false,
    description: service.description,
    title: service?.title,
    type: service?.company_service_type_id,
    price: service?.price
  }))

  const defaultValues: Order = {
    product_id: String(id),
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    identification_number: '',
    booking: {
      book_from: '',
      book_to: ''
    },
    dob: new Date(),
    driver_license_expiration: new Date(),
    additional_services: additionalService,
    supply: '0',
    start_time: '',
    end_time: '',
    start_address: singleProductDetails?.start_address || '',
    end_address: singleProductDetails?.end_address || ''
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
    resolver: yupResolver(BookingSchema) as any
  })

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
      setValue('dob', userInfo?.UserID === userInfo?.active_profile_id ? userInfo?.information?.birth_date : new Date())
      setValue(
        'driver_license_expiration',
        userInfo?.UserID === userInfo?.active_profile_id ? userInfo?.information?.driver_license_expiration : new Date()
      )

      setValue('start_address', singleProductDetails ? singleProductDetails?.start_address : '')
      setValue('end_address', singleProductDetails ? singleProductDetails?.end_address : '')
      setValue('additional_services', singleProductDetails ? additionalService : [])

      setValue('booking.book_from', book_from ? book_from : '')
      setValue('booking.book_to', book_to ? book_to : '')
      setValue('product_id', id ? String(id) : null)
    }
  }, [userInfo, setValue, singleProductDetails, book_from, book_to, id])

  const bookingValues: any = useWatch({ control })

  console.log(singleProductDetails?.start_address, 'singleProductDetails?.start_address')

  const postOrder = async (AccessToken = '', company: Order) => {
    try {
      const response: any = await OrderService.postOrder(AccessToken, company)

      return response.data
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

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
    postOrder
  }
}

export default useBooking
