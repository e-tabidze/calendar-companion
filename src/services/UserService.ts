import HttpService from './HttpService'

class UserService extends HttpService {
  postSwitchProfile(AccessToken = '', active_profile_id: string) {
    return this.post('/switch-profile', { active_profile_id }, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getUserInfo(AccessToken = '') {
    return this.get('/user', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  updateUserInfo(AccessToken = '', userInfo: any) {
    return this.post('/user-informations', userInfo, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  changeUserPassword(AccessToken = '', passwordInfo: any) {
    return this.post(
      'https://test.accounts.tnet.ge/api/ka/password',
      passwordInfo,
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  addUserFavourites(AccessToken = '', product_id: any) {
    return this.post('/add-user-favourites', product_id, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getUserFavourites(AccessToken = '') {
    return this.get('/user-favourites', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new UserService()
