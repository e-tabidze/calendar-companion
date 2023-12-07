export type BookingDates = {
  book_from: any
  book_to: any
}

export type Booking = {
  booking: BookingDates
  first_name: string
  last_name: string
  dob: string | null
  driver_license_expiration: string | null
  email: string
  phone: string
  identification_number: string
  additional_services: any[]
  supply: any,
  start_address: string,
  end_address: string
  start_time: '',
  end_time: ''
  product_id: string | number
}
