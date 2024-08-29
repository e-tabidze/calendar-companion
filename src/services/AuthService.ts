import HttpService from './HttpService'
import { AuthUser, Workspace } from 'src/types/auth'

class AuthService extends HttpService {
  postRegister(AccessToken = '', registerUserData: AuthUser) {
    return this.post('/api/signup', registerUserData, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postSignIn(AccessToken = '', loginData: AuthUser) {
    return this.post('/api/signin', loginData, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postVerifyEmail(AccessToken = '', code: string) {
    return this.post(`/api/verify-email/${code}`, code, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCheckUser(AccessToken = '') {
    return this.get(`/api/auth/check`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  putUsers(AccessToken = '', id: string | number, userData: any) {
    return this.put(`/api/users/${id}`, userData, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postWorkspace(AccessToken = '', workspaceData: Workspace) {
    return this.post(`/api/companies`, workspaceData, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getGoogleListCalendars(AccessToken = '', account_id: string) {
    return this.get(
      `/api/list-google-calendars?account_id=${account_id}`,
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  postGoogleCalendars(AccessToken = '', account_id: string, calendar: any) {
    return this.post(`/api/google-calendars?account_id=${account_id}`, calendar, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new AuthService()
