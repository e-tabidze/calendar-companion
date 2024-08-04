import AuthService from 'src/services/AuthService'
import { useQuery } from '@tanstack/react-query'
import Cookie from 'src/helpers/Cookie'

const useUserData = () => {
  const useCheckUser: any = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getCheckUser(''),
    staleTime: Infinity,
    enabled: !!Cookie.get('AccessToken')
  })

  const userData = useCheckUser.data

  const getCheckUser = async (AccessToken = '') => {
    try {
      const response: any = await AuthService.getCheckUser(AccessToken)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  return {
    userData
  }
}

export default useUserData
