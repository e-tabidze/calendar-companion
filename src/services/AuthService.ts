import HttpService from './HttpService'
import { RegisterUser, Workspace } from 'src/types/auth'

class AuthService extends HttpService {
  postRegister(AccessToken = '', registerUserData: RegisterUser) {
    return this.post('/signup', registerUserData, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postVerifyEmail(AccessToken = '', code: string) {
    return this.post(`/verify-email/${code}`, code, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCheckUser(AccessToken = '') {
    return this.get(`/auth/check`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  putUsers(AccessToken = '', id: string | number, userData: any) {
    return this.put(`/users/${id}`, userData, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postWorkspace(AccessToken = '', workspaceData: Workspace) {
    return this.post(`/companies`, workspaceData, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getGoogleListCalendars(AccessToken = '', account_id: string) {
    return this.get(
      `/list-google-calendars?account_id=${account_id}`,
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  postGoogleCalendars(AccessToken = '', calendar: any) {
    return this.post(`/google-calendars`, calendar, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new AuthService()
