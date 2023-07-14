import HttpService from './HttpService'

class UserService extends HttpService {
  getUserData() {
    return this.get('/customer/data')
  }
}

export default new UserService()
