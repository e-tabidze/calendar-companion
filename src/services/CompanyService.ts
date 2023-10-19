import HttpService from './HttpService'
import { Company } from 'src/types/Company'
import { NewService } from 'src/types/Product'

class CompanyService extends HttpService {
  createCompany(AccessToken = '', company: Company) {
    return this.post('/companies', company, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyServices(AccessToken = '', company_id: number) {
    return this.get(
      `/company-services?company_id=${company_id}`,
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  postCompanyServices(service: NewService, AccessToken = '') {
    return this.post('/company-services', service, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new CompanyService()
