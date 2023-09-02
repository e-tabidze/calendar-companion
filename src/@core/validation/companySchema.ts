import * as Yup from 'yup'
import { Company, CompanyAddress, CompanyInfo, WorkingHours, WorkingTime } from 'src/types/Company'

const WorkingTimeSchema = Yup.object<WorkingTime>().shape({
  start_time: Yup.string(),
  end_time: Yup.string(),
  is_selected: Yup.boolean()
})

const WorkingHoursSchema = Yup.object<WorkingHours>().shape({
  monday: WorkingTimeSchema,
  tuesday: WorkingTimeSchema,
  wednesday: WorkingTimeSchema,
  thursday: WorkingTimeSchema,
  friday: WorkingTimeSchema,
  saturday: WorkingTimeSchema,
  sunday: WorkingTimeSchema
})

const CompanyAddressSchema = Yup.object<CompanyAddress>().shape({
  address: Yup.string(),
  phone: Yup.string(),
  email: Yup.string().email('მეილის ფორმატი არასწორია'),
  lat: Yup.string(),
  long: Yup.string(),
  working_hours: WorkingHoursSchema
})

const CompanyInfoSchema = Yup.object<CompanyInfo>().shape({
  name: Yup.string().required("სავალდებულო ველი"),
  logo: Yup.string(),
  description: Yup.string().required("სავალდებულო ველი"),
  email: Yup.string().email('მეილის ფორმატი არასწორია'),
  phone_numbers: Yup.string()
})

const CompanySchema = Yup.object<Company>().shape({
  identification_number: Yup.number()
    .required('საინდეთიფიკაციო ნომერი უნდა იყოს რიცხვი')
    .nullable()
    .typeError('საინდეთიფიკაციო ნომერი უნდა იყოს რიცხვი')
    .test('is-11-digit', 'საინდეთიფიკაციო ნომერი უნდა იყოს 11 ნიშნიანი', value => {
      if (value === null || value === undefined) {
        return true
      }
      const numericValue = parseFloat(value.toString())
      return !isNaN(numericValue) && numericValue.toString().length === 11
    }),

  company_type_id: Yup.mixed().required('Company type is required'),

  company_information: CompanyInfoSchema,

  addresses: Yup.array<CompanyAddress>().of(CompanyAddressSchema)
})

export { CompanySchema }
