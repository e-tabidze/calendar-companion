import HttpService from './HttpService'

class UserService extends HttpService {
  postSwitchProfile(AccessToken = '', active_profile_id: string) {
    return this.post('/switch-profile', {active_profile_id}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getUserInfo(AccessToken = '') {
    return this.get('/user', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  updateUserInfo(AccessToken = '', userInfo: any) {
    return this.post('/user-informations', userInfo, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new UserService()
