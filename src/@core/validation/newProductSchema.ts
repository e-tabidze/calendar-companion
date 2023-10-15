import * as Yup from 'yup'

const NewProductSchema = Yup.object().shape({
  company_id: Yup.number().required('საინდეთიფიკაციო ნომერი უნდა იყოს რიცხვი').nullable(),
  vin: Yup.mixed().required('აუცილებელი ველი'),
  plate: Yup.mixed().required('აუცილებელი ველი'),
  man_id: Yup.mixed().required('აუცილებელი ველი'),
  model_id: Yup.mixed().required('აუცილებელი ველი'),
  category_id: Yup.mixed().required('აუცილებელი ველი')
})
export { NewProductSchema }
