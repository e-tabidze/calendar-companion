import { useQuery } from '@tanstack/react-query'
import useProfile from 'src/hooks/useProfile'
import OrderService from 'src/services/OrderService'

const useCompanyOrders = (orderId?: string | number | undefined) => {
  const { activeCompanyId } = useProfile()
  const useOrders: any = useQuery({
    queryKey: ['companyOrders'],
    queryFn: () => getCompanyOrders(),
    staleTime: Infinity,
    enabled: !!activeCompanyId
  })

  const useOrder: any = useQuery({
    queryKey: ['companyOrder', orderId],
    queryFn: () => getCompanyOrder('', orderId),
    staleTime: Infinity,
    enabled: !!activeCompanyId && !!orderId
  })

  const companyOrders = useOrders?.data?.result?.data
  const companyOrder = useOrder?.data?.result?.data
  const companyOrderproductData = useOrder?.data && JSON.parse(useOrder?.data?.result?.data?.product_data)

  return {
    companyOrders,
    companyOrdersLoading: useOrders.isLoading,
    companyOrder,
    companyOrderLoading: useOrder.isLoading,
    postOrderStatus,
    companyOrderproductData
  }
}

export default useCompanyOrders

export const getCompanyOrders = async () => {
  try {
    const response: any = await OrderService.getCompanyOrders('')

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getCompanyOrder = async (AccessToken = '', orderId: number | string | undefined) => {
  try {
    const response: any = orderId && (await OrderService.getCompanyOrder(AccessToken, orderId))

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postOrderStatus = async (AccessToken = '', orderId: number | string | undefined, status: 0 | 1 | 2) => {
  try {
    const response: any = orderId && (await OrderService.postCompanyOrderStatus(AccessToken, orderId, status))

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
