import { Product } from 'src/types/product'
import HttpService from './HttpService'

class ProductService extends HttpService {
  getManufacturers(AccessToken = '') {
    return this.get('/manufacturers', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getManufacturerModels(AccessToken = '', manufacturerId: string) {
    return this.get(
      `/manufacturer-models?manufacturer_id=${manufacturerId}`,
      {},
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  getProductDetails(AccessToken = '') {
    return this.get('/product-details', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getAdditionalParams(AccessToken = '') {
    return this.get('/additional-information', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  createNewProduct(AccessToken = '', product: Product) {
    return this.post('/products', product, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new ProductService()
