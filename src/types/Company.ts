export type WorkingTime = {
  start_time: string
  end_time: string
  is_selected: boolean
}
export type WorkingHours = {
  monday: WorkingTime
  tuesday: WorkingTime
  wednesday: WorkingTime
  thursday: WorkingTime
  friday: WorkingTime
  saturday: WorkingTime
  sunday: WorkingTime
}

export type CompanyAddress = {
  address: string
  phone: number
  email?: string
  city: string
  state?: string
  postal_code?: string
  lat: string
  long: string
  working_hours: WorkingHours
  is_same_time?: any
  start_time?: string
  end_time?: string
  id?: string
  dummyAddressId?: number
}

export type CompanyInfo = {
  name: string
  legal_name: string
  logo: string
  description: string
  description_en: string
  email: string
  phone_numbers: string
  iban: ''
}

export type Company = {
  identification_number: number
  company_type_id: number | string
  company_information: CompanyInfo
  addresses: CompanyAddress[]
  company_id?: number
  terms_and_conditions: string
}
