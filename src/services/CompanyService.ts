import HttpService from './HttpService'
import { Company } from 'src/types/Company'
import { NewService } from 'src/types/Product'

class CompanyService extends HttpService {
  createCompany(AccessToken = '', company: Company) {
    return this.post('/companies', company, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyServices(AccessToken = '') {
    return this.get(`/company-services`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  postCompanyServices(service: NewService, AccessToken = '') {
    return this.post('/company-services', service, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyBranches(AccessToken = '') {
    return this.get(`/company-branches`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyInfo(AccessToken = '', company_id: number | string) {
    return this.get(`/companies/${company_id}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  updateCompanyInfo(AccessToken = '', company_id: number, company: any) {
    return this.put(`/companies/${company_id}`, company, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  deleteCompanyAddress(AccessToken = '', id: string | number) {
    return this.delete(`/addresses/${id}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  deleteCompany(AccessToken = '', company_id: number) {
    return this.delete(`/companies/${company_id}`, AccessToken ? { Authorization: `${AccessToken}` } : {})
  }

  getCompanyProducts(AccessToken = '', activeStatus: 0 | 1 | 2 | '', page: number) {
    return this.get(
      `/products?is_active=${activeStatus}&page=${page}`,
      AccessToken ? { Authorization: `${AccessToken}` } : {}
    )
  }

  getSingleCompanyBranches(company_id: number | string) {
    return this.get(`/single-company-branches/${company_id}`, {})
  }
}

export default new CompanyService()
