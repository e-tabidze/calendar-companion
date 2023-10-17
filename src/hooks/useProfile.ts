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

  const useUserCompanies: any = useQuery({
    queryKey: ['companies'],
    queryFn: () => getUserCompanies(),
    staleTime: Infinity,
    enabled: !!usePersonalInfo.data?.result?.data.UserID
  })

  const userInfo = usePersonalInfo.data?.result?.data
  const isLoading = usePersonalInfo.isLoading
  const refetch = usePersonalInfo.refetch
  const userCompanies = useUserCompanies.data?.result?.data
  const isCompaniesLoading = useUserCompanies.isLoading

  return {
    router,
    userInfo,
    isLoading,
    refetch,
    userCompanies,
    isCompaniesLoading
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

export const getUserCompanies = async (accessToken = '') => {
  try {
    const response: any = await UserService.getUserCompanies(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
