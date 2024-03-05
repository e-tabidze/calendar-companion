export type Product = {
  id: number
  user_id: number
  company_id: 134
  vin: string
  plate: string
  man_id: number
  model_id: number
  prod_year: number
  car_run: number
  measure: string
  additional_information: string
  additional_information_en: string
  use_instruction: string
  use_instruction_en:string
  images: any
  category_id: number
  fuel_type_id: number
  seat_type_id: number
  luggage_numbers: number
  door_type_id: number
  drive_tires_id: number
  transmission_type_id: number
  price: number
  price_usd: number
  price_gel: number
  currency: string
  apply_discount: number
  any_period: number
  min_time_interval: string
  min_time_span: number
  start_city: string
  end_city: string
  start_address: string
  end_address: string
  start_lat: any
  start_lon: any
  end_lat: any
  end_lon: any
  is_active: 1
  created_at: string
  updated_at: string
  deleted_at: any
  count_user_favourites: number
  manufacturer_model: {
    id: number
    manufacturer_id: number
    title: string
    type_id: number
  }
  manufacturer: {
    id: number
    manufacturer_id: number
    title: string
    type_id: number
  }
}
