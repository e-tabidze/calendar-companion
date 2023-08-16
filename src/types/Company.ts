export type CompanyInfo = {
  name: string
  description: string
  logo: string
  address: string
}

export type Company = {
  identification_number: number
  company_type_id: number
  company_information: CompanyInfo
}
