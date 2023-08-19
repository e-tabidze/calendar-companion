import HttpService from './HttpService'
import { Company } from 'src/types/Company'

class CompanyService extends HttpService {
  getCompanies(AccessToken = '') {
    return this.get('/user-companies', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  createCompany(AccessToken = '', company: Company) {
    return this.post("/companies", company, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new CompanyService()
