import * as Yup from 'yup'

const NewProductPrice = Yup.object().shape({
  amount: Yup.number().typeError('price_is_number').required('required_field'),
  currency: Yup.string()
})

const Odometer = Yup.object().shape({
  run: Yup.number().required('required_field').typeError('run_is_number')
})

const CompanyService = Yup.object().shape({
  currency: Yup.string(),
  quantity: Yup.string(),
  is_selected: Yup.boolean()
})

const NewProductSchema = Yup.object().shape({
  vin: Yup.string().max(17, 'max_symbol_length_17'),
  plate: Yup.string().required('required_field'),
  man_id: Yup.number().required('required_field').typeError('required_field'),
  model_id: Yup.number().required('required_field').typeError('required_field'),
  prod_year: Yup.number().required('required_field').typeError('required_field'),
  additional_information: Yup.string().required('required_field').typeError('required_field'),
  use_instruction: Yup.string().required('required_field').typeError('required_field'),
  images: Yup.array().of(Yup.string()).min(4, 'car_photos_from_to').max(15, 'car_max_photos'),
  category_id: Yup.number().required('required_field').typeError('required_field'),
  steering_wheel: Yup.number().required('required_field').typeError('required_field'),
  fuel_type_id: Yup.number().required('required_field').typeError('required_field'),
  seat_type_id: Yup.number().required('required_field').typeError('required_field'),
  luggage_numbers: Yup.number().required('required_field').typeError('required_field'),
  door_type_id: Yup.number().required('required_field').typeError('required_field'),
  drive_tires_id: Yup.number().required('required_field').typeError('required_field'),
  transmission_type_id: Yup.number().required('required_field').typeError('required_field'),
  daily_price: NewProductPrice,
  odometer: Odometer,
  company_services: Yup.array().of(CompanyService),
  start_city: Yup.string().required('required_field').typeError('required_field'),
  start_address: Yup.string().required('required_field').typeError('required_field'),
  end_city: Yup.string().required('required_field').typeError('required_field'),
  end_address: Yup.string().required('required_field').typeError('required_field')
})
export { NewProductSchema }
