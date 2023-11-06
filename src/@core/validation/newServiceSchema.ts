import * as Yup from 'yup'

const NewServiceSchema = Yup.object().shape({
  company_id: Yup.string().required(),
  title: Yup.string().required('აუცილებელი ველი'),
  description: Yup.string().required('აუცილებელი ველი'),
  type_id: Yup.string().required('აუცილებელი ველი')
});

export { NewServiceSchema }
