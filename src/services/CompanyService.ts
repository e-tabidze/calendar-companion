import HttpService from './HttpService'
import { CompanyInfo } from 'src/types/Company'

class CompanyService extends HttpService {
  getCompanies(AccessToken = '') {
    return this.get('/user-companies', {}, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  createCompany(AccessToken = '', companyInfo: CompanyInfo) {
    return this.post("/companies", companyInfo, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new CompanyService()
