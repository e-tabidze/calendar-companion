import { useQuery } from '@tanstack/react-query'
import MainPageService from 'src/services/MainPageService'

const useMain = () => {
  const useLatestProducts: any = useQuery({
    queryKey: ['popularProducts'],
    queryFn: () => getLatestProducts(),
    staleTime: Infinity,
    enabled: true
  })

//   const usePopularProducts: any = useQuery({
//     queryKey: ['manufacturers'],
//     queryFn: () => getLatestProducts(),
//     staleTime: Infinity
//   })

  const latestProducts = useLatestProducts?.data?.result?.data

//   const popularProducts = usePopularProducts?.data?.result?.data

  return {
    latestProducts,
    // popularProducts,
    isLatestProductsoading: useLatestProducts.isLoading,
    // isPopularProductsoading: usePopularProducts.isLoading
  }
}

export default useMain

export const getLatestProducts = async () => {
  try {
    const response: any = await MainPageService.getLatestProducts()

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
