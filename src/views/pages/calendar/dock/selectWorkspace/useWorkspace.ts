import { useQuery } from '@tanstack/react-query'
import WorkspaceService from 'src/services/WorkspaceService'

const useWorkspace = () => {
  const useGetWorkspaces: any = useQuery({
    queryKey: ['workspaces'],
    queryFn: () => getWorkspaces(''),
    enabled: true
  })

  const workspacesData = useGetWorkspaces.data?.result
  const isLoading = useGetWorkspaces.isLoading

  const getWorkspaces = async (AccessToken = '') => {
    try {
      const response: any = await WorkspaceService.getWorkspaces(AccessToken)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  const postSwitchWorkspace = async (AccessToken = '', active_profile_id: string) => {
    try {
      const response: any = await WorkspaceService.postSwitchWorkspace(AccessToken, active_profile_id)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    }
  }

  return {
    workspacesData,
    isLoading,
    postSwitchWorkspace
  }
}

export default useWorkspace
