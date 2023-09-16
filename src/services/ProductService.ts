import HttpService from './HttpService'

class ProductService extends HttpService {
  getSeatTypes(AccessToken = '') {
    return this.get('/seat-types', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getDoorTypes(AccessToken = '') {
    return this.get('/door-types', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getDriveTypes(AccessToken = '') {
    return this.get('/drive-tires', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getTransmissionTypes(AccessToken = '') {
    return this.get('/transmission-types', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCategories(AccessToken = '') {
    return this.get('/categories', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getManufacturers(AccessToken = '') {
    return this.get('/manufacturers', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getManufacturerModels(AccessToken = '') {
    return this.get('/manufacturer-models', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getFuels(AccessToken = '') {
    return this.get('/fuels', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

}

export default new ProductService()
