export type CompanyAddress = {
  address: string
  city: string
  state: string
  postal_code: string
  working_hours: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
  }
}

export type CompanyInfo = {
  name: string
  description: string
  logo: string
  address: CompanyAddress[]
}

export type Company = {
  identification_number: number | null
  company_type_id: number | string
  company_information: CompanyInfo
}
