import * as Yup from 'yup'

const RegisterSchema = Yup.object().shape({
  username: Yup.string().email('Email format error').nullable().required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password cannot be more than 64 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[\W_]/, 'Password must contain at least one special character'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('password')], 'Password must match')
    .required('Password is required'),
  terms_and_conditions: Yup.string().oneOf(['1'], 'Terms and conditions must be accepted')
})

export { RegisterSchema }
