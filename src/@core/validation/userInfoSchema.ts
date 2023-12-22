import * as Yup from 'yup'

const UserInfoSchema = Yup.object().shape({
  identification_number: Yup.number()
    .required('პირადი ნომერი უნდა იყოს რიცხვი')
    .typeError('საინდეთიფიკაციო ნომერი უნდა იყოს რიცხვი')
    .test('is-11-digit', 'საინდეთიფიკაციო ნომერი უნდა იყოს 11 ნიშნიანი', value => {
      if (value === null || value === undefined) {
        return true
      }
      const numericValue = parseFloat(value.toString())

      return !isNaN(numericValue) && numericValue.toString().length === 11
    }),
  phone: Yup.number()
    .typeError('ტელეფონის ნომერი უნდა იყოს რიცხვი')
    .required('აუცილებელი ველი')
    .min(6, 'მინიმუმ 6 რიცხვი'),
  birth_date: Yup.string().required('აუცილებელი ველი'),
  driver_license_expiration: Yup.string().required('აუცილებელი ველი')
})

const PasswordSchema = Yup.object().shape({
  current_password: Yup.string().required('აუცილებელი ველი'),
  password: Yup.string().required('აუცილებელი ველი'),
  confirm_password: Yup.string()
    .required('აუცილებელი ველი')
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
})

export { UserInfoSchema, PasswordSchema }
