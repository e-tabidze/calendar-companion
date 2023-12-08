export type AdditionalOption = {
  id: number
  title: string
}

export type Discount = {
  number: number
  period: string
  discount_percent: number
}

export type Service = {
  id: number
  price: number
  currency?: string
  quantity: number
  description: any
  title: any
  company_service_type_id?: any
}

export type Product = {
  company_id: number
  vin: string
  plate: string
  man_id: number
  model_id: number
  prod_year: number
  odometer: {
    run: number | string
    measure: string
  }
  additional_information: string
  use_instruction: string
  category_id: number
  fuel_type_id: number
  seat_type_id: number
  suitcases: number
  door_type_id: number
  drive_tires_id: number
  transmission_type_id: number
  additional_options: AdditionalOption[]
  apply_discount: boolean
  discount: Discount[]
  company_services: Service[]
  has_min_period: boolean
  min_period: any
  preparation_period: string
}

export type NewService = {
  company_id: string | number
  title: string
  description: string
  type_id: number | string
  id: number
}
