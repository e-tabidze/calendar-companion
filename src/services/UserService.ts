import HttpService from './HttpService'

class UserService extends HttpService {
  getUserData(AccessToken = '') {
    return this.get('/user', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new UserService()
