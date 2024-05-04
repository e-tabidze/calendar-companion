import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import useProfile from 'src/hooks/useProfile'
import OrderService from 'src/services/OrderService'

const useOrders = (orderId?: string | number | undefined, page?: number) => {
  const router = useRouter()

  const { isAuthenticated } = useProfile()

  const useUserOrders: any = useQuery({
    queryKey: ['userOders', page],
    queryFn: () => getUserOrders(page || 1),
    staleTime: Infinity,
    enabled: router.asPath.includes('/profile/orders/?page=') || router.asPath.includes('/profile/transactions/?page=')
  })

  const useOrderDetails: any = useQuery({
    queryKey: ['userOdersDetails', orderId],
    queryFn: () => getUserOrderDetails(orderId),
    staleTime: Infinity,
    enabled: !!isAuthenticated && !!orderId
  })

  const userOrders = useUserOrders?.data?.result
  const userOrderDetails = useOrderDetails?.data?.result?.data
  const productData = useOrderDetails?.data && JSON.parse(useOrderDetails?.data?.result?.data?.product_data)
  const useUserOrdersLoading = useUserOrders.isLoading

  return {
    userOrders,
    userOrderDetails,
    productData,
    
    // cancelUserOrder,
    useUserOrdersLoading
  }
}

export default useOrders

export const getUserOrders = async (page: number) => {
  try {
    const response: any = await OrderService.getUserOrders('', page)

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

// export const cancelUserOrder = async (orderId: number | string, status: number) => {
//   try {
//     const response: any = await OrderService.postUserCancelOrder('', orderId, status)

//     return response.data
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }
