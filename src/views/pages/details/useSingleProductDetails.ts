import { useQuery } from '@tanstack/react-query'
import OrderService from 'src/services/OrderService'
import SearchService from 'src/services/SearchService'

const useSingleProductDetails = (id: any) => {
  console.log(Number(id), 'id?')
  const getSingleProduct = async () => {
    const response: any = await SearchService.getSingleProduct('', id)

    return response.data?.result?.data
  }

  const orderDates = async () => {
    try {
      const response: any = await OrderService.orderDates('', Number(id))

      return response.data
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

  const { data: singleProductDetails } = useQuery(['singleProduct', id], getSingleProduct, {
    enabled: !!id
  })

  const useOrderDates: any = useQuery({
    queryKey: ['orderDates'],
    queryFn: () => orderDates(),
    staleTime: Infinity,
    enabled: !!id,
  })

  const orderDatesData = useOrderDates?.data?.result

  return { singleProductDetails, orderDatesData }
}

export default useSingleProductDetails
