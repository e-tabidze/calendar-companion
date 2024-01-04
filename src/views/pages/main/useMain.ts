import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import useProfile from 'src/hooks/useProfile'
import MainPageService from 'src/services/MainPageService'
import ProductService from 'src/services/ProductService'

const useMain = (manId?: any, modelId?: any) => {
  const { isAuthenticated } = useProfile()
  const router = useRouter()

  const usePopularProducts: any = useQuery({
    queryKey: ['popularProducts'],
    queryFn: () => getPopularProducts(),
    staleTime: Infinity,
    enabled: router.pathname === '/'
  })

  const useSimilarProducts: any = useQuery({
    queryKey: ['similarProducts'],
    queryFn: () => getSimilarProducts(manId, modelId),
    staleTime: Infinity,
    enabled: !!manId && !!modelId
  })

  const useLasSeenProducts: any = useQuery({
    queryKey: ['lastSeenProducts'],
    queryFn: () => getLastSeenProducts(''),
    staleTime: Infinity,
    enabled: !!isAuthenticated
  })

  const popularProducts = usePopularProducts?.data?.result?.data
  const similarProducts = useSimilarProducts?.data?.result?.data
  const lastSeenProducts = useLasSeenProducts?.data?.result?.data?.data

  return {
    popularProducts,
    similarProducts,
    lastSeenProducts,
    isPopularProductsoading: usePopularProducts.isLoading,
    isSimilarProductsLoading: useSimilarProducts.isLoading
  }
}

export default useMain

export const getPopularProducts = async () => {
  try {
    const response: any = await MainPageService.getPopulaProducts()

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getLastSeenProducts = async (AccessToken = '') => {
  try {
    const response: any = await MainPageService.getLastSeenProducts(AccessToken)

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
