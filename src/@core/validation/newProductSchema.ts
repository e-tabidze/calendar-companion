import * as Yup from 'yup'

const NewProductPrice = Yup.object().shape({
  amount: Yup.number().required('აუცილებელი ველი'),
  currency: Yup.string()
})

const Odometer = Yup.object().shape({
  run: Yup.number().required('აუცილებელი ველი')
})

const NewProductSchema = Yup.object().shape({
  company_id: Yup.number().required(),
  man_id: Yup.mixed().required('აუცილებელი ველი'),
  model_id: Yup.mixed().required('აუცილებელი ველი'),
  category_id: Yup.mixed().required('აუცილებელი ველი'),
  daily_price: NewProductPrice,
  odometer: Odometer
})
export { NewProductSchema }
