import HttpService from './HttpService'

class MainPageService extends HttpService {
  getLatestProducts() {
    return this.get('/search-products?order_by=desc')
  }
}

export default new MainPageService()
