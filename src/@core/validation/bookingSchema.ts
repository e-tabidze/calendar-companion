import { Order, OrderDates, OrderService } from 'src/types/Order'
import * as Yup from 'yup'

const OrderDatesSchema = Yup.object<OrderDates>().shape({
  book_from: Yup.string().required('required_field'),
  book_to: Yup.string().required('required_field')
})

const OrderServiceSchema = Yup.object<OrderService>().shape({
  id: Yup.number().required(),
  count: Yup.number().required(),
  is_selected: Yup.boolean().required(),
  description: Yup.string().required('required_field'),
  title: Yup.string().required('required_field'),
  type: Yup.number().required(),
  price: Yup.number().required()
})

const BookingSchema = Yup.object<Order>().shape({
  product_id: Yup.number().required(),
  first_name: Yup.string().required('required_field'),
  last_name: Yup.string().required('required_field'),
  email: Yup.string().required('required_field'),
  phone: Yup.string()
    .matches(/^\d+$/, 'phone_is_number')
    .max(9, 'phone_is_9_digit')
    .required('required_field'),
  identification_number: Yup.string().required('required_field'),
  booking: OrderDatesSchema,
  dob: Yup.string().nullable().required('required_field') as Yup.StringSchema<string | null>,
  driver_license_expiration: Yup.string().nullable().required('required_field') as Yup.StringSchema<string | null>,
  additional_services: Yup.array(OrderServiceSchema).required('required_field'),
  supply: Yup.string().required('required_field'),

  start_time: Yup.string().required('required_field').typeError('required_field'),
  end_time: Yup.string().required('required_field').typeError('required_field'),
  start_address: Yup.string().required('required_field'),
  end_address: Yup.string().required('required_field')
})

export { BookingSchema }
