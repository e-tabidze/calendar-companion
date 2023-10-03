export type WorkingTime = {
  start_time: string
  end_time: string
  is_selected: boolean
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
  address?: string
  phone?: string
  email?: string
  city?: string
  state?: string
  postal_code?: string
  lat?: string
  long?: string
  working_hours?: WorkingHours
}

export type CompanyInfo = {
  name: string
  logo: string
  description: string
  email: string
  phone_numbers: string
}

export type Company = {
  identification_number: number | null
  company_type_id: number | string
  company_information: CompanyInfo
  addresses: CompanyAddress[]
}
