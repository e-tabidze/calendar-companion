import * as Yup from 'yup'

const NewServiceSchema = Yup.object().shape({
  title: Yup.string().required('required_field'),
  description: Yup.string().required('required_field'),
  type_id: Yup.string().required('required_field')
});

export { NewServiceSchema }
