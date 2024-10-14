import AuthService from 'src/services/AuthService'
import { useQuery } from '@tanstack/react-query'
import CalendarService from 'src/services/CalendarService'

const useUserData = () => {
  const useCheckUser: any = useQuery({
    queryKey: ['userInfo'],
    queryFn: () => getCheckUser(''),
    enabled: true
  })

  const useGetPrimaryCalendar: any = useQuery({
    queryKey: ['primaryCalendar'],
    queryFn: () => getPrimaryCalendar(''),
    enabled: true
  })

  const userData = useCheckUser.data
  const isLoading = useCheckUser.isLoading
  const workspaces = useCheckUser.data?.workspaces
  const activeWorkspace = useCheckUser.data?.workspaces?.find(
    (workspace:any) => workspace.id === useCheckUser.data?.active_profile_id
  );
  const primaryCalendar = useGetPrimaryCalendar.data?.result?.data[0]

  const getCheckUser = async (AccessToken = '') => {
    try {
      const response: any = await AuthService.getCheckUser(AccessToken)

      return response.data
    } catch (error) {
      throw error
    }
  }

  const getPrimaryCalendar = async (AccessToken = '') => {
    try {
      const response: any = await CalendarService.getPrimaryCalendar(AccessToken)

      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    userData,
    isLoading,
    workspaces,
    activeWorkspace,
    primaryCalendar
  }
}

export default useUserData
