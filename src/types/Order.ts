export type OrderDates = {
  book_from: any
  book_to: any
}

export type OrderService = {
  id: number
  count: number
  is_selected: true
  description: string
  title: string
  type: number
  price: number
}

export type Order = {
  first_name: string
  last_name: string
  product_id: number | string | null
  email: string
  phone: string
  identification_number: string
  booking: {
    book_from: any
    book_to: any
  }
  dob: string | Date
  driver_license_expiration: string | Date
  additional_services: OrderService[]
  supply: string
  return_location: string
  start_time: string
  end_time: string
  start_city: string,
  start_address: string
  end_city: string
  end_address: string
  other_end_city: string,
  other_start_city: string,
}
