import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, useWatch } from 'react-hook-form'
import { CancelReservationSchema } from 'src/@core/validation/cancelReservationSchema'
import OrderService from 'src/services/OrderService'

const useCancelReservation = () => {
  const defaultValues = {
    cancel_reason: '',
    custom_cancel_reason: '',
    status_id: status
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
    resolver: yupResolver(CancelReservationSchema)
  })

  const cancelReservationValues: any = useWatch({ control })

  const cancelReservation = async (
    AccessToken = '',
    cancelReason: string,
    orderId: string | number,
    status: number
  ) => {
    try {
      const response: any = await OrderService.cancelReservation(AccessToken, cancelReason, orderId, status)

      return response.data
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

  return {
    control,
    cancelReservationValues,
    errors,
    isValid,
    handleSubmit,
    cancelReservation
  }
}

export default useCancelReservation
