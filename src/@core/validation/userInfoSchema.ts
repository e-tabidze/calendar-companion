import * as Yup from 'yup'

const UserInfoSchema = Yup.object().shape({
  identification_number: Yup.number()
    .required('საინდეთიფიკაციო ნომერი უნდა იყოს რიცხვი')
    .typeError('საინდეთიფიკაციო ნომერი უნდა იყოს რიცხვი')
    .test('is-11-digit', 'საინდეთიფიკაციო ნომერი უნდა იყოს 11 ნიშნიანი', value => {
      if (value === null || value === undefined) {
        return true
      }
      const numericValue = parseFloat(value.toString())

      return !isNaN(numericValue) && numericValue.toString().length === 11
    }),
  phone: Yup.number().typeError('ტელეფონის ნომერი უნდა იყოს რიცხვი').required('აუცილებელი ველი')
})

export { UserInfoSchema }
