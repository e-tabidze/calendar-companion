import UserService from 'src/services/UserService'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

const useProfile = () => {
  const router = useRouter()

  const usePersonalInfo: any = useQuery({
    queryKey: ['personalInfo'],
    queryFn: () => getUserInfo(),
    staleTime: Infinity
  })

  const userInfo = usePersonalInfo.data?.result?.data
  const isLoading = usePersonalInfo.isLoading
  const refetch = usePersonalInfo.refetch

  return {
    router,
    userInfo,
    isLoading,
    refetch
  }
}

export default useProfile

export const getUserInfo = async (accessToken = '') => {
  try {
    const response: any = await UserService.getUserInfo(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
