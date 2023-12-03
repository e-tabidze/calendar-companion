import { Booking, BookingDates } from 'src/types/Booking'
import * as Yup from 'yup'

const BookingDatesSchema = Yup.object<BookingDates>().shape({
  book_from: Yup.string().required('აუცილებელი ველი'),
  book_to: Yup.string().required('აუცილებელი ველი')
})

const BookingSchema = Yup.object<Booking>().shape({
  booking: BookingDatesSchema,
  first_name: Yup.string().required('აუცილებელი ველი'),
  last_name: Yup.string().required('აუცილებელი ველი'),
  birth_date: Yup.mixed().nullable().required('აუცილებელი ველი') as Yup.StringSchema<string | null>,
  driver_license_expiration: Yup.mixed().nullable().required('აუცილებელი ველი') as Yup.StringSchema<string | null>,
  email: Yup.string().required('აუცილებელი ველი'),
  phone: Yup.string().required('აუცილებელი ველი'),
  identification_number: Yup.string().required('აუცილებელი ველი')
})


export { BookingSchema }
