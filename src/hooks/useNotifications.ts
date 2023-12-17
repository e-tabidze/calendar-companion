import { useQuery } from '@tanstack/react-query'
import Cookie from 'src/helpers/Cookie'
import NotificationsService from 'src/services/NotificationsService'

const useNotifications = (id?: string) => {
  const AccessToken = Cookie.get('AccessToken')

  const useGetNotifications: any = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
    staleTime: Infinity,
    enabled: !!AccessToken
  })

  const useGetNotificationDetails: any = useQuery({
    queryKey: ['notificationDetails', id, 'notifications'],
    queryFn: () => id && getNotificationDetails('', id),
    staleTime: Infinity,
    enabled: !!AccessToken && !!id
  })

  const notifictions = useGetNotifications.data?.result?.data
  const notifictionDetails = useGetNotificationDetails.data?.result?.data

  console.log(useGetNotificationDetails.status, 'useGetNotificationDetails status')

  return {
    notifictions,
    notifictionDetails
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

export const getNotificationDetails = async (accessToken = '', id: string) => {
  try {
    const response: any = await NotificationsService.getNotificationDetails(accessToken, id)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
