import HttpService from './HttpService'

class AuthService extends HttpService {
  logout(AccessToken = '') {
    return this.post(
      'https://test.accounts.tnet.ge/api/ka/user/logout',
      {},
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }
}

export default new AuthService()
