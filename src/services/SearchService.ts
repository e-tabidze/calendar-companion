import HttpService from './HttpService'

class SearchService extends HttpService {
  getProductFilters() {
    return this.get('/product-filters')
  }

  getSearchProducts() {
    return this.get('search-products')
  }

  getSingleProduct(productId: string) {
    return this.get(`single-product/${productId}`)
  }
}

export default new SearchService()
