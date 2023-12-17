import { useQuery } from '@tanstack/react-query'
import Cookie from 'src/helpers/Cookie'
import NotificationsService from 'src/services/NotificationsService'

const useNotifications = () => {
  const AccessToken = Cookie.get('AccessToken')

  const useGetNotifications: any = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
    staleTime: Infinity,
    enabled: !!AccessToken
  })

  const notifictions = useGetNotifications.data?.result?.data

  return {
    notifictions
  }
}

export default useNotifications

export const getNotifications = async (accessToken = '') => {
  try {
    const response: any = await NotificationsService.getNotifications(accessToken)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
