import * as Yup from 'yup'

const CompanySchema = Yup.object().shape({
  identification_number: Yup.number()
    .required('აუცილებელი ველი')
    .nullable()
    .typeError('საინდეტიფიკაციო კოდი უნდა იყოს რიცხვი')
    .test('is-11-digit', 'კოდი უნდა იყოს 11 ნიშნიანი', value => {
      if (value === null) {
        return true
      }
      const numericValue = parseFloat(value)
      return !isNaN(numericValue) && numericValue.toString().length === 11
    }),
  company_information: Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    logo: Yup.string(),
    address: Yup.array().of(
      Yup.object().shape({
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        postal_code: Yup.string(),
        working_hours: Yup.object().shape({
          monday: Yup.object().shape({
            startTime: Yup.string(),
            endTime: Yup.string()
          }),
          tuesday: Yup.object().shape({
            startTime: Yup.string(),
            endTime: Yup.string()
          }),
          wednesday: Yup.object().shape({
            startTime: Yup.string(),
            endTime: Yup.string()
          }),
          thursday: Yup.object().shape({
            startTime: Yup.string(),
            endTime: Yup.string()
          }),
          friday: Yup.object().shape({
            startTime: Yup.string(),
            endTime: Yup.string()
          }),
          saturday: Yup.object().shape({
            startTime: Yup.string(),
            endTime: Yup.string()
          }),
          sunday: Yup.object().shape({
            startTime: Yup.string(),
            endTime: Yup.string()
          })
        })
      })
    ),
    contact: Yup.object().shape({
      email: Yup.string().email('არასწორი ფორმატი').required('აუცილებელი ველი'),
      officeNumber: Yup.string(),
      mobile: Yup.array()
        .of(Yup.mixed())
        .test('is-string-or-number', 'მობილური ნომერი ან რიცხვია', value => {
          return value.every(item => typeof item === 'string' || typeof item === 'number')
        })
    })
  })
})

export { CompanySchema }
