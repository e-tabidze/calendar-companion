import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import OrderService from 'src/services/OrderService'

const useCompanyOrders = (statusId: '' | '0' | '1' | '2' | '5' | string | string[], page?: number) => {
  const router = useRouter()
  const { id } = router.query

  const useOrders: any = useQuery({
    queryKey: ['companyOrders', statusId, page],
    queryFn: () => getCompanyOrders(statusId, page || 1),
    staleTime: Infinity,
    enabled: router.asPath.includes('/dashboard/orders/?status_id=') || router.asPath.includes('dashboard/payments/')
  })

  const useOrder: any = useQuery({
    queryKey: ['companyOrder', id],
    queryFn: () => id && getCompanyOrder('', Number(id)),
    staleTime: Infinity,
    enabled: !!id
  })

  const orders = useOrders?.data?.result
  const companyOrder = useOrder?.data?.result?.data
  const companyOrderproductData = useOrder?.data && JSON.parse(useOrder?.data?.result?.data?.product_data)
  const fetchOrderDetails = useOrder.refetch
  const fetchOrderFilters = useOrders.refetch

  return {
    orders,
    companyOrdersLoading: useOrders.isLoading,
    companyOrder,
    companyOrderLoading: useOrder.isLoading,
    postOrderStatus,
    companyOrderproductData,
    fetchOrderDetails,
    fetchOrderFilters
  }
}

export default useCompanyOrders

export const getCompanyOrders = async (statusId: '' | '0' | '1' | '2' | '5' | string | string[], page: number) => {
  try {
    const response: any = await OrderService.getCompanyOrders('', statusId, page)

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
