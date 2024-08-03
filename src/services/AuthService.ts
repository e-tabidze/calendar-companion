import HttpService from './HttpService'
import { RegisterUser } from 'src/types/auth'

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
}

export default new AuthService()
