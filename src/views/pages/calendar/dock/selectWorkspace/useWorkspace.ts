import WorkspaceService from 'src/services/WorkspaceService'

const useWorkspace = () => {
  const postSwitchWorkspace = async (AccessToken = '', workspace_id: string) => {
    try {
      const response: any = await WorkspaceService.postSwitchWorkspace(AccessToken, workspace_id)

      return response.data
    } catch (error) {
      throw error
    }
  }

  return {
    postSwitchWorkspace
  }
}

export default useWorkspace
