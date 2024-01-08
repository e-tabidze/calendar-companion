import * as Yup from 'yup'

const NewProductPrice = Yup.object().shape({
  amount: Yup.number().typeError('თანხის ველი უნდა იყოს რიცხვი').required('აუცილებელი ველი'),
  currency: Yup.string()
})

const Odometer = Yup.object().shape({
  run: Yup.number().required('აუცილებელი ველი').typeError('თანხის ველი უნდა იყოს რიცხვი')
})

const CompanyService = Yup.object().shape({
  id: Yup.number().required('აუცილებელი ველი'),
  currency: Yup.string(),
  quantity: Yup.string(),
  is_selected: Yup.boolean()
})

const NewProductSchema = Yup.object().shape({
  vin: Yup.string().required('აუცილებელი ველი'),
  plate: Yup.string().required('აუცილებელი ველი'),
  man_id: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  model_id: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  prod_year: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  additional_information: Yup.string().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  use_instruction: Yup.string().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  images: Yup.array().of(Yup.string()).min(3, 'გთხოვთ, ატვირთოთ ავტომობილის ფოტოები, მინიმუმ 3, მაქსიმუმ 15').max(15, 'ავტომობილის ფოტოების მაქსიმალური რაოდენობა არის 15'),
  category_id: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  steering_wheel: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  fuel_type_id: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  seat_type_id: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  luggage_numbers: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  door_type_id: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  drive_tires_id: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  transmission_type_id: Yup.number().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  daily_price: NewProductPrice,
  odometer: Odometer,
  company_services: Yup.array().of(CompanyService),
  start_city: Yup.string().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  start_address: Yup.string().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  end_city: Yup.string().required('აუცილებელი ველი').typeError('აუცილებელი ველი'),
  end_address: Yup.string().required('აუცილებელი ველი').typeError('აუცილებელი ველი')
})
export { NewProductSchema }
