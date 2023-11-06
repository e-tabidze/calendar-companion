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

  getCompanyBranches(AccessToken = '', company_id: number) {
    return this.get(`/company-branches/${company_id}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyInfo(AccessToken = '', company_id: number) {
    return this.get(`/companies/${company_id}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  updateCompanyInfo(AccessToken = '', company_id: number, company: any) {
    return this.put(`/companies/${company_id}`, company, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  deleteCompany(AccessToken = '', company_id: number) {
    return this.delete(`/companies/${company_id}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyProducts(AccessToken = '') {
    return this.get(`/products`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }
}

export default new CompanyService()
