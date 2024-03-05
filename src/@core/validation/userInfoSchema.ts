import * as Yup from 'yup'

const UserInfoSchema = Yup.object().shape({
  identification_number: Yup.number()
    .required('personal_number_is_number')
    .typeError('identification_number_is_number')
    .test('is-11-digit', 'identification_number_11_digit', value => {
      if (value === null || value === undefined) {
        return true
      }
      const numericValue = parseFloat(value.toString())

      return !isNaN(numericValue) && numericValue.toString().length === 11
    }),
  phone: Yup.number()
    .typeError('phone_is_number')
    .required('required_field')
    .min(6, 'min_6_number'),
  birth_date: Yup.string().required('required_field'),
  driver_license_expiration: Yup.string().required('required_field')
})

const PasswordSchema = Yup.object().shape({
  current_password: Yup.string().required('required_field'),
  password: Yup.string().required('required_field'),
  confirm_password: Yup.string()
    .required('required_field')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
})

export { UserInfoSchema, PasswordSchema }
