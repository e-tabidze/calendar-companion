import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import Cookie from 'src/helpers/Cookie'
import NotificationsService from 'src/services/NotificationsService'

const useNotifications = (notificationId?: string, companyId?: string) => {
  const AccessToken = Cookie.get('AccessToken')

  const router = useRouter()

  const useGetNotifications: any = useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
    staleTime: Infinity,
    enabled: !!AccessToken
  })

  const useGetNotificationDetails: any = useQuery({
    queryKey: ['notificationDetails', notificationId, 'notifications', companyId, router.asPath],
    queryFn: () => notificationId && companyId && getNotificationDetails('', notificationId, companyId),
    staleTime: Infinity,
    enabled: !!AccessToken && !!notificationId && !!companyId
  })

  const notifictions = useGetNotifications.data?.result?.data
  const notifictionDetails = useGetNotificationDetails.data?.result?.data
  const refetchNotifications = useGetNotifications.refetch
  const notificationsLoading = useGetNotifications.isLoading

  return {
    notifictions,
    notifictionDetails,
    refetchNotifications,
    notificationsLoading
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

export const getNotificationDetails = async (accessToken = '', notificationId: string, companyId: string) => {
  try {
    const response: any = await NotificationsService.getNotificationDetails(accessToken, notificationId, companyId)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
