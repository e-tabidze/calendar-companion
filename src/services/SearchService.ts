import HttpService from './HttpService'

class SearchService extends HttpService {
  getProductFilters() {
    return this.get('/product-filters')
  }

  getSingleProduct(productId: number | string) {
    return this.get(`/single-product/${productId}`, {}, { Authorization: '' })
  }

  getAdditionalInformationFilters() {
    return this.get('/additional-information-filters')
  }

  getManufacturerFilters() {
    return this.get('https://test-api-rent-golang.myauto.ge/api/manufacturer-filters')
  }

  getManufacturerModelsFilters(queryString: string) {
    return this.get(`https://test-api-rent-golang.myauto.ge/api/manufacturer-model-filters?${queryString}`)
  }

  getSearchProducts(querystring: string) {
    return this.get(`https://test-api-rent-golang.myauto.ge/api/search-products?${querystring}&order_by=asc`)
  }

  getCities() {
    return this.get('/cities')
  }
}

export default new SearchService()
