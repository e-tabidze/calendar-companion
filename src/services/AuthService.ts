import HttpService from './HttpService'

class AuthService extends HttpService {
  signIn(params: any) {
    return this.post('/user', params)
  }
}

export default new AuthService()
