import { useQuery } from '@tanstack/react-query'
import useProfile from 'src/hooks/useProfile'
import OrderService from 'src/services/OrderService'

const useCompanyOrders = () => {
  const { activeCompanyId } = useProfile()
  const useOrders: any = useQuery({
    queryKey: ['companyOrders'],
    queryFn: () => getCompanyOrders(),
    staleTime: Infinity,
    enabled: !!activeCompanyId
  })

  const companyOrders = useOrders?.data?.result?.data

  return {
    companyOrders,
    companyOrdersLoading: useOrders.isLoading
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
