import { Order, OrderDates, OrderService } from 'src/types/Order'
import * as Yup from 'yup'

const OrderDatesSchema = Yup.object<OrderDates>().shape({
  book_from: Yup.string().required('აუცილებელი ველი'),
  book_to: Yup.string().required('აუცილებელი ველი')
})

const OrderServiceSchema = Yup.object<OrderService>().shape({
  id: Yup.number().required(),
  count: Yup.number().required(),
  is_selected: Yup.boolean().required(),
  description: Yup.string().required('აუცილებელი ველი'),
  title: Yup.string().required('აუცილებელი ველი'),
  type: Yup.number().required(),
  price: Yup.number().required()
})

const BookingSchema = Yup.object<Order>().shape({
  product_id: Yup.number().required(),
  first_name: Yup.string().required('აუცილებელი ველი'),
  last_name: Yup.string().required('აუცილებელი ველი'),
  email: Yup.string().required('აუცილებელი ველი'),
  phone: Yup.string()
    .matches(/^\d+$/, 'ტელეფონის ნომერი უნდა იყოს რიცხვი')
    .max(9, 'ტელეფონის ნომერი უნდა იყოს მაქსიმუმ 9 ციფრი')
    .required('აუცილებელი ველი'),
  identification_number: Yup.string().required('აუცილებელი ველი'),
  booking: OrderDatesSchema,
  dob: Yup.string().nullable().required('აუცილებელი ველი') as Yup.StringSchema<string | null>,
  driver_license_expiration: Yup.string().nullable().required('აუცილებელი ველი') as Yup.StringSchema<string | null>,
  additional_services: Yup.array(OrderServiceSchema).required('აუცილებელი ველი'),
  supply: Yup.string().required('აუცილებელი ველი'),

  start_time: Yup.string().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  end_time: Yup.string().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  start_address: Yup.string().required('აუცილებელი ველი'),
  end_address: Yup.string().required('აუცილებელი ველი')
})

export { BookingSchema }
