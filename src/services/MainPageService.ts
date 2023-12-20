import HttpService from './HttpService'

class MainPageService extends HttpService {
  getPopulaProducts() {
    return this.get('/search-products?order_by=desc&popular=1&sort_by=id')
  }

  getLastSeenProducts(AccessToken = '') {
    return this.get('/user-last-views', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new MainPageService()
