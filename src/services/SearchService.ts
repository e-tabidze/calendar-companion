import HttpService from './HttpService'

class SearchService extends HttpService {
  getProductFilters() {
    return this.get('/product-filters')
  }

  getSingleProduct(AccessToken = '', productId: number | string) {
    return this.get(`/single-product/${productId}`, {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getAdditionalInformationFilters() {
    return this.get('/additional-information-filters')
  }

  getManufacturerFilters() {
    return this.get('/manufacturer-filters')
  }

  getManufacturerModelsFilters(queryString: string) {
    return this.get(`/manufacturer-model-filters?${queryString}`)
  }

  getSearchProducts(AccessToken = '', querystring: string) {
    return this.get(`/search-products?${querystring}&`, {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCities() {
    return this.get('/cities')
  }
}

export default new SearchService()
