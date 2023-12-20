import UserService from 'src/services/UserService'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Cookie from 'src/helpers/Cookie'
import { TNET_AUTH } from 'src/env'
import AuthService from 'src/services/AuthService'

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
    staleTime: Infinity,
    enabled: !!AccessToken
  })

  const queryClient = useQueryClient()

  const postSwitchProfile = async (accessToken = '', active_profile_id: string) => {
    try {
      const response: any = await UserService.postSwitchProfile(accessToken, active_profile_id)

      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logout = async (accessToken = '') => {
    try {
      const response: any = await AuthService.logout(accessToken)

      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      Cookie.remove('AccessToken')
      localStorage.clear()
      queryClient.invalidateQueries(['profileInfo'])

      if (router?.pathname.includes('profile') || router?.pathname.includes('dashboard')) {
        router.replace('/')
        router.reload()
      } else {
        router.reload()
      }
    },
    onError: error => {
      console.error(error)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate('')
  }

  const handleLogin = () => {
    const externalPageUrl = TNET_AUTH
    window.location.href = externalPageUrl
    router.push('/')
  }

  const isLoading = usePersonalInfo.isLoading
  const refetch = usePersonalInfo.refetch
  const userInfo = usePersonalInfo.data?.result?.data
  const userCompanies = usePersonalInfo.data?.result?.data?.companies
  const activeCompany = usePersonalInfo?.data?.result?.data?.active_profile
  const activeCompanyId = usePersonalInfo?.data?.result?.data?.active_profile?.id
  const userId = usePersonalInfo.data?.result?.data?.UserID

  const defaultImgUrl = `https://static.my.ge/users/profile/${userInfo?.UserID}.jpg?${Math.random()}`

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
    handleLogout,
    handleLogin,
    defaultImgUrl
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
