import { useQuery } from '@tanstack/react-query'
import MainPageService from 'src/services/MainPageService'
import ProductService from 'src/services/ProductService'

const useMain = (manId?: any, modelId?: any) => {
  const useLatestProducts: any = useQuery({
    queryKey: ['latestProducts'],
    queryFn: () => getLatestProducts(),
    staleTime: Infinity,
    enabled: true
  })

  const usePopularProducts: any = useQuery({
    queryKey: ['popularProducts'],
    queryFn: () => getPopularProducts(),
    staleTime: Infinity
  })

  const useSimilarProducts: any = useQuery({
    queryKey: ['similarProducts'],
    queryFn: () => getSimilarProducts(manId, modelId),
    staleTime: Infinity,
    enabled: !!manId && !!modelId
  })

  const latestProducts = useLatestProducts?.data?.result?.data
  const popularProducts = usePopularProducts?.data?.result?.data
  const similarProducts = useSimilarProducts?.data?.result?.data

  return {
    latestProducts,
    popularProducts,
    similarProducts,
    isLatestProductsoading: useLatestProducts.isLoading,
    isPopularProductsoading: usePopularProducts.isLoading,
    isSimilarProductsLoading: useSimilarProducts.isLoading
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

export const getPopularProducts = async () => {
  try {
    const response: any = await MainPageService.getPopulaProducts()

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getSimilarProducts = async (manId: string, modelId: string) => {
  try {
    const response: any = await ProductService.getSimilarProducts(manId, modelId)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
