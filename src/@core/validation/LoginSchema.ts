import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
  username: Yup.string().email('email_format_error').nullable().required('Email is required'),
  password: Yup.string().required('Password is required')
})

export { LoginSchema }
