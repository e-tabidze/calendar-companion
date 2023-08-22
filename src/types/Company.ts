export type WorkingTime = {
  startTime: string
  endTime: string
}
export type WorkingHours = {
  monday?: WorkingTime
  tuesday?: WorkingTime
  wednesday?: WorkingTime
  thursday?: WorkingTime
  friday?: WorkingTime
  saturday?: WorkingTime
  sunday?: WorkingTime
}

export type CompanyAddress = {
  address: string
  city: string
  state: string
  postal_code: string
  working_hours: any
}

export type CompanyInfo = {
  name: string
  description: string
  logo: string
  address: any
}

export type Company = {
  identification_number: number | null
  company_type_id: number | string
  company_information: CompanyInfo
}
