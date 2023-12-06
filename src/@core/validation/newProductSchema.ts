import * as Yup from 'yup'

const NewProductPrice = Yup.object().shape({
  amount: Yup.number()
    .typeError('თანხის ველი უნდა იყოს რიცხვი')
    .required('აუცილებელი ველი')
    .test('is-number', 'თანხა უნდა იყოს რიცხვი', value => !isNaN(value)),
  currency: Yup.string()
})

const Odometer = Yup.object().shape({
  run: Yup.number().required('აუცილებელი ველი')
})

const NewProductSchema = Yup.object().shape({
  man_id: Yup.mixed().required('აუცილებელი ველი'),
  model_id: Yup.mixed().required('აუცილებელი ველი'),
  category_id: Yup.mixed().required('აუცილებელი ველი'),
  daily_price: NewProductPrice,
  odometer: Odometer
})
export { NewProductSchema }
