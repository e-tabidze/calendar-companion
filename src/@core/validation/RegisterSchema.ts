import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('email_format_error').nullable(),
  password: Yup.string(),
  repeat_password: Yup.string(),
  terms_and_conditions: Yup.string(),
  confirmation_url: Yup.string()
})

export { RegisterSchema }
