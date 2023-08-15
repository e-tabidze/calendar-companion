import HttpService from './HttpService'

class CompanyService extends HttpService {
  getCompanies(AccessToken = '') {
    return this.get('/user-companies', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new CompanyService()
