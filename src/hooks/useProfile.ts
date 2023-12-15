import UserService from 'src/services/UserService'
import { useRouter } from 'next/router'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Cookie from 'src/helpers/Cookie'

const useProfile = () => {
  const router = useRouter()

  const AccessToken = Cookie.get('AccessToken')

  const usePersonalInfo: any = useQuery({
    queryKey: ['profileInfo'],
    queryFn: () => {
      if (AccessToken) {
        return getUserInfo(AccessToken)
      } else {
        return false
      }
    },
    staleTime: Infinity
  })

  const queryClient = useQueryClient()

  const handleLogout = async () => {
    Cookie.remove('AccessToken')
    localStorage.clear()
    await queryClient.invalidateQueries(['profileInfo'])

    if (router?.pathname.includes('profile') || router?.pathname.includes('dashboard')) {
      await router.replace('/')
      await router.reload()
    } else {
      await router.reload()
    }
  }

  const postSwitchProfile = async (accessToken = '', active_profile_id: string) => {
    try {
      const response: any = await UserService.postSwitchProfile(accessToken, active_profile_id)

      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const isLoading = usePersonalInfo.isLoading
  const refetch = usePersonalInfo.refetch
  const userInfo = usePersonalInfo.data?.result?.data
  const userCompanies = usePersonalInfo.data?.result?.data?.companies
  const activeCompany = usePersonalInfo?.data?.result?.data?.active_profile
  const activeCompanyId = usePersonalInfo?.data?.result?.data?.active_profile?.id
  const userId = usePersonalInfo.data?.result?.data?.UserID

  return {
    router,
    userInfo,
    isLoading,
    refetch,
    userCompanies,
    postSwitchProfile,
    activeCompany,
    activeCompanyId,
    isAuthenticated: usePersonalInfo.data || false,
    userId,
    handleLogout
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
