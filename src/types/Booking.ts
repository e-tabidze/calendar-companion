export type BookingDates = {
  book_from: any
  book_to: any
}

export type Booking = {
  booking: BookingDates
  first_name: string
  last_name: string
  birth_date: string | null
  driver_license_expiration: string | null
  email: string
  phone: string
  identification_number: string
  additional_services: any[]
}
