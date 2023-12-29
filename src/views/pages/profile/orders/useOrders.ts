import { useQuery } from '@tanstack/react-query'
import useProfile from 'src/hooks/useProfile'
import OrderService from 'src/services/OrderService'

const useOrders = (orderId?: string | number | undefined) => {
  const { isAuthenticated } = useProfile()

  const useUserOrders: any = useQuery({
    queryKey: ['userOders'],
    queryFn: () => getUserOrders(),
    staleTime: Infinity,
    enabled: !!isAuthenticated
  })

  const useOrderDetails: any = useQuery({
    queryKey: ['userOdersDetails', orderId],
    queryFn: () => getUserOrderDetails(orderId),
    staleTime: Infinity,
    enabled: !!isAuthenticated && !!orderId
  })

  const userOrders = useUserOrders?.data?.result?.data
  const userOrderDetails = useOrderDetails?.data?.result?.data
  const productData = useOrderDetails?.data && JSON.parse(useOrderDetails?.data?.result?.data?.product_data)

  return {
    userOrders,
    userOrderDetails,
    productData,
    cancelUserOrder
  }
}

export default useOrders

export const getUserOrders = async () => {
  try {
    const response: any = await OrderService.getUserOrders('')

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getUserOrderDetails = async (orderId: number | string | undefined) => {
  try {
    const response: any = await OrderService.getUserOrdersDetails('', orderId)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const cancelUserOrder = async (orderId: number | string, status: number) => {
  try {
    const response: any = await OrderService.postUserCancelOrder('', orderId, status)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
