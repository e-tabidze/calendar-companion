import HttpService from './HttpService'

class UserService extends HttpService {
  getUserInfo(AccessToken = '') {
    return this.get('/user', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  updateUserInfo(AccessToken = '', userInfo: any) {
    return this.post('/user-informations', userInfo, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new UserService()
