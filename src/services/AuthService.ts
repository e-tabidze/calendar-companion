import HttpService from './HttpService'

class AuthService extends HttpService {
  signIn(params: any) {
    return this.post('/user?reset_switch=1', params)
  }
}

export default new AuthService()
