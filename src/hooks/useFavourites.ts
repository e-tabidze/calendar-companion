import UserService from 'src/services/UserService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useProfile from './useProfile'

const useFavourites = (productId?: string | number, page?: number) => {
  const queryClient = useQueryClient()
  const { isAuthenticated, activeCompanyId } = useProfile()

  const toggleFavourites = async (accessToken = '') => {
    try {
      const response: any = await UserService.addUserFavourites(accessToken, { product_id: productId })

      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const toggleUserFavourites = useMutation(() => toggleFavourites(''), {
    onSettled: () => {
      queryClient.invalidateQueries(['singleProduct'])
      queryClient.invalidateQueries(['userFavourites'])
      queryClient.invalidateQueries(['popularProducts'])
      queryClient.invalidateQueries(['similarProducts'])
      queryClient.invalidateQueries(['searchProducts'])
      queryClient.invalidateQueries(['lastSeenProducts'])
    }
  })

  const useFavourites: any = useQuery({
    queryKey: ['userFavourites', page],
    queryFn: () => getUserFavourites('', page || 1),
    staleTime: Infinity,
    enabled: !!isAuthenticated && activeCompanyId === undefined
  })

  const userFavourites = useFavourites?.data?.result
  const isLoading = useFavourites?.isLoading
  const userFavouritesLength = useFavourites?.data?.result?.total

  return { toggleUserFavourites, userFavourites, isLoading, userFavouritesLength }
}

export default useFavourites

export const getUserFavourites = async (accessToken = '', page: number) => {
  try {
    const response: any = await UserService.getUserFavourites(accessToken, page)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
