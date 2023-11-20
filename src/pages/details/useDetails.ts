import { useQuery } from '@tanstack/react-query'
import SearchService from 'src/services/SearchService'

const useDetails = (productId: number | string) => {
  console.log(productId, 'productId')
  const useSingleProductDetails: any = useQuery({
    queryKey: ['singleProductDetails'],
    queryFn: () => getSingleProductDetails(productId),
    staleTime: Infinity,
    enabled: true
  })

  const singleProductDetails = useSingleProductDetails?.data?.result?.data
  const isLoading = useSingleProductDetails?.isLoading

  return {
    singleProductDetails,
    isLoading,
    getSingleProductDetails
  }
}

export default useDetails

export const getSingleProductDetails = async (productId: number | string) => {
  try {
    const response: any = await SearchService.getSingleProduct(productId)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
