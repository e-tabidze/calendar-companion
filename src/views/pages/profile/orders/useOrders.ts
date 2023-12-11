import { useQuery } from '@tanstack/react-query'
import useProfile from 'src/hooks/useProfile'
import OrderService from 'src/services/OrderService'

const useUserOrders = (orderId?: string | number | undefined) => {
  const { isAuthenticated } = useProfile()

  const useOrders: any = useQuery({
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

  const userOrders = useOrders?.data?.result?.data
  const userOrderDetails = useOrderDetails?.data?.result?.data

  return {
    userOrders,
    userOrderDetails
  }
}

export default useUserOrders

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
