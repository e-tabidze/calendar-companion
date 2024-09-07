import AuthService from 'src/services/AuthService'
import { useQuery } from '@tanstack/react-query'

const useUserData = () => {
  const useCheckUser: any = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getCheckUser(''),
    enabled: true
  })

  const userData = useCheckUser.data
  const isLoading = useCheckUser.isLoading
  const workspaces = useCheckUser.data?.workspaces
  const activeWorkspace = useCheckUser.data?.active_profile

  const getCheckUser = async (AccessToken = '') => {
    try {
      const response: any = await AuthService.getCheckUser(AccessToken)

      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    userData,
    isLoading,
    workspaces,
    activeWorkspace
  }
}

export default useUserData
