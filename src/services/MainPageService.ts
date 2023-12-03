import HttpService from './HttpService'

class MainPageService extends HttpService {
  getLatestProducts() {
    return this.get('/search-products?order_by=desc')
  }

  getPopulaProducts() {
    return this.get('/search-products?order_by=desc&popular=1')
  }
}

export default new MainPageService()
