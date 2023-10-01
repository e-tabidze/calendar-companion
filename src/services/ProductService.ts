import HttpService from './HttpService'

class ProductService extends HttpService {
  getManufacturers(AccessToken = '') {
    return this.get('/manufacturers', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getManufacturerModels(AccessToken = '', manufacturerId: string) {
    return this.get(`/manufacturer-models?manufacturer_id=${manufacturerId}`, {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getProductDetails(AccessToken = '') {
    return this.get('/product-details', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getAdditionalOptions(AccessToken = '') {
    return this.get('/additional-options', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new ProductService()
