import UserService from 'src/services/UserService'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

const useProfile = () => {
  const router = useRouter()

  const usePersonalInfo: any = useQuery({
    queryKey: ['profileInfo'],
    queryFn: () => getUserInfo(),
    staleTime: Infinity
  })

  const postSwitchProfile = async (accessToken = '', active_profile_id: string) => {
    try {
      const response: any = await UserService.postSwitchProfile(accessToken, active_profile_id)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const userInfo = usePersonalInfo.data?.result?.data
  const userCompanies = usePersonalInfo.data?.result.data?.companies
  const isLoading = usePersonalInfo.isLoading
  const refetch = usePersonalInfo.refetch
  const actveProfileInfo = usePersonalInfo?.data?.result?.data?.active_profile
  const actveProfileId = usePersonalInfo?.data?.result?.data?.active_profile_id
  const activeCompany = usePersonalInfo?.data?.result?.data?.active_profile

  return {
    router,
    userInfo,
    isLoading,
    refetch,
    userCompanies,
    postSwitchProfile,
    actveProfileInfo,
    actveProfileId,
    activeCompany
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
