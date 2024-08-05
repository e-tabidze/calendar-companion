import HttpService from './HttpService'
import { AuthUser, Workspace } from 'src/types/auth'

class AuthService extends HttpService {
  postRegister(AccessToken = '', registerUserData: AuthUser) {
    return this.post('/signup', registerUserData, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postSignIn(AccessToken = '', loginData: AuthUser) {
    return this.post('/signin', loginData, AccessToken ? { Authorization: `${AccessToken}` } : {})
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

  postGoogleCalendars(AccessToken = '', account_id: string, calendar: any) {
    return this.post(`/google-calendars?account_id=${account_id}`, calendar, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new AuthService()
