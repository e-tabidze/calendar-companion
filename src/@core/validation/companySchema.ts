import * as Yup from 'yup'
import { Company, CompanyAddress, PhoneNumber, WorkingHours, WorkingTime } from 'src/types/Company'

const WorkingTimeSchema = Yup.object<WorkingTime>().shape({
  startTime: Yup.string(),
  endTime: Yup.string()
})

const PhoneNumberSchema = Yup.object<PhoneNumber>().shape({
  type: Yup.string().required(),
  number: Yup.string().required()
})

const CompanyAddressSchema = Yup.object<CompanyAddress>().shape({
  address: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  postal_code: Yup.string(),
  working_hours: Yup.object<WorkingHours>().shape({
    monday: WorkingTimeSchema,
    tuesday: WorkingTimeSchema,
    wednesday: WorkingTimeSchema,
    thursday: WorkingTimeSchema,
    friday: WorkingTimeSchema,
    saturday: WorkingTimeSchema,
    sunday: WorkingTimeSchema
  })
})

const CompanySchema = Yup.object<Company>().shape({
  identification_number: Yup.number()
    .required('აუცილებელი ველი')
    .nullable()
    .typeError('საინდეტიფიკაციო კოდი უნდა იყოს რიცხვი')
    .test('is-11-digit', 'კოდი უნდა იყოს 11 ნიშნიანი', value => {
      if (value === null || value === undefined) {
        return true
      }
      const numericValue = parseFloat(value.toString())
      return !isNaN(numericValue) && numericValue.toString().length === 11
    }),

  company_type_id: Yup.mixed().required(),

  company_information: Yup.object().shape({
    name: Yup.string().required('აუცილებელი ველი'),
    description: Yup.string(),
    logo: Yup.string(),

    address: Yup.array<CompanyAddress>().of(CompanyAddressSchema),

    contact: Yup.object().shape({
      email: Yup.string().email('არასწორი ფორმატი').required('აუცილებელი ველი'),
      phoneNumbers: Yup.array<PhoneNumber>().of(PhoneNumberSchema)
    })
  })
})

export { CompanySchema }
