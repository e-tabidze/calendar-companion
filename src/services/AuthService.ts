import { RegisterUser } from 'src/types/auth'
import HttpService from './HttpService'

class AuthService extends HttpService {
  postRegister(AccessToken = '', registerUserData: RegisterUser) {
    return this.post('/signup', registerUserData, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new AuthService()
