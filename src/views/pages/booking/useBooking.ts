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

const useBooking = (id: number | string | string[], company_id?: any) => {
  const { userInfo, activeCompanyId } = useProfile()
  const { singleProductDetails } = useSingleProductDetails(id)

  const router = useRouter()
  const { book_from, book_to } = router.query

  const additionalService = singleProductDetails?.product_services.map((service: Service) => ({
    id: service.id | 0,
    count: 1,
    is_selected: false,
    description: service.description,
    title: service?.title,
    type_id: service?.company_service_type_id,
    price: service?.price,
    max: service?.quantity,
    currency: service?.currency
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
    dob: '',
    driver_license_expiration: '',
    additional_services: additionalService,
    supply: '0',
    return_location: '0',
    start_time: router.asPath.includes('dashboard') ? '06:00' : '',
    end_time: router.asPath.includes('dashboard') ? '22:00' : '',
    start_city: singleProductDetails?.start_city || '',
    start_address: singleProductDetails?.start_address || '',
    end_city: singleProductDetails?.end_city || '',
    end_address: singleProductDetails?.end_address || '',
    other_end_city: '',
    other_start_city: ''
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
    if ((!!userInfo && userInfo?.UserID === userInfo?.active_profile_id) || activeCompanyId == company_id) {
      setValue('first_name', userInfo?.information?.first_name ?? userInfo?.FirstName ?? '')
      setValue('last_name', userInfo?.information?.last_name ?? userInfo?.LastName ?? '')
      setValue('identification_number', userInfo?.information?.identification_number ?? '')
      setValue('email', userInfo?.Email ?? '')
      setValue('phone', userInfo?.phone ?? '')
      setValue('dob', userInfo?.information?.birth_date ?? '')
      setValue('driver_license_expiration', userInfo?.information?.driver_license_expiration ?? '')

      setValue('start_city', singleProductDetails ? singleProductDetails?.start_city : '')
      setValue('start_address', singleProductDetails ? singleProductDetails?.start_address : '')
      setValue('end_city', singleProductDetails ? singleProductDetails?.end_city : '')
      setValue('end_address', singleProductDetails ? singleProductDetails?.end_address : '')
      setValue('additional_services', singleProductDetails ? additionalService : [])

      setValue('booking.book_from', book_from ? book_from : '')
      setValue('booking.book_to', book_to ? book_to : '')
      setValue('product_id', id ? String(id) : null)
    }
  }, [userInfo, setValue, singleProductDetails, book_from, book_to, id, company_id, activeCompanyId])

  const bookingValues: any = useWatch({ control })

  const postOrder = async (AccessToken = '', company: Order) => {
    try {
      const response: any = await OrderService.postOrder(AccessToken, company)

      return response.data
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

  const selfBookProduct = async (company: Order) => {
    try {
      const response: any = await OrderService.selfBookProduct('', company)

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
    postOrder,
    selfBookProduct
  }
}

export default useBooking
