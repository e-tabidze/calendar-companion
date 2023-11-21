import * as Yup from 'yup'

const BookingSchema = Yup.object().shape({
  book_from: Yup.string().required('აუცილებელი ველი'),
  book_to: Yup.string().required('აუცილებელი ველი'),
  booking: Yup.string().required('აუცილებელი ველი'),
})
export { BookingSchema }
