import HttpService from './HttpService'

class WorkspaceService extends HttpService {
  postSwitchWorkspace(AccessToken = '', active_profile_id: string) {
    return this.post(
      `/api/switch-workspace`,
      { active_profile_id },
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }
}

export default new WorkspaceService()
