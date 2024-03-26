import * as Yup from 'yup'

const NewServiceSchema = Yup.object().shape({
  title: Yup.string().required('required_field'),
  title_en: Yup.string().required('required_field'),
  description: Yup.string().required('required_field'),
  description_en: Yup.string().required('required_field'),
  type_id: Yup.string().required('required_field').typeError('required_field'),
  has_quantity: Yup.number().required('required_field').nullable().typeError('required_field')
})

export { NewServiceSchema }
