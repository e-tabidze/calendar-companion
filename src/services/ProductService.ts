import { Product } from 'src/types/Product'
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

  editProductDetails(AccessToken = '', id: number) {
    return this.get(`/products/${id}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  editProduct(AccessToken = '', id: number, product: Product) {
    return this.put(`/products/${id}`, product, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getSimilarProducts(manId: number | string, modelId: number | string) {
    return this.get(`/search-products?manufacturer_id[]=${manId}&model_id[]=${modelId}&order_by=desc`)
  }
}

export default new ProductService()
