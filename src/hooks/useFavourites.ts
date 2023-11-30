import UserService from 'src/services/UserService'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useProfile from './useProfile'

const useFavourites = (productId?: string | number) => {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useProfile()

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
      queryClient.invalidateQueries(['userFavourites'])
    }
  })

  const useFavourites: any = useQuery({
    queryKey: ['userFavourites'],
    queryFn: () => getUserFavourites(),
    staleTime: Infinity,
    enabled: isAuthenticated
  })

  const userFavourites = useFavourites?.data?.result?.data
  const isLoading = useFavourites?.isLoading

  return { toggleUserFavourites, userFavourites, isLoading }
}

export default useFavourites

export const getUserFavourites = async (accessToken = '') => {
  try {
    const response: any = await UserService.getUserFavourites(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
