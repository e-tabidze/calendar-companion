import HttpService from './HttpService'

class SearchService extends HttpService {
  getProductFilters() {
    return this.get('/product-filters')
  }

  getSingleProduct(productId: number | string) {
    return this.get(`/single-product/${productId}`)
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

  getSearchProducts(querystring: string) {
    return this.get(`/search-products?${querystring}`)
  }
}

export default new SearchService()
