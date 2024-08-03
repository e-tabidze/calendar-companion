import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
  username: Yup.string().email('email_format_error').nullable().required('required'),
  password: Yup.string().min(8, 'min').max(10, 'max').required('required'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password')], 'passwords_must_match')
    .required('required'),
  terms_and_conditions: Yup.string().oneOf(['1'], 'terms_must_be_accepted'),
})

export { RegisterSchema }
