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
  email: Yup.string().email('Invalid email format'),
  lat: Yup.string(),
  long: Yup.string(),
  working_hours: WorkingHoursSchema
})

const CompanyInfoSchema = Yup.object<CompanyInfo>().shape({
  name: Yup.string().required("required"),
  logo: Yup.string(),
  description: Yup.string().required("required"),
  email: Yup.string().email('Invalid email format'),
  phone_numbers: Yup.string()
})

const CompanySchema = Yup.object<Company>().shape({
  identification_number: Yup.number()
    .required('Identification number is required')
    .nullable()
    .typeError('Identification number must be a number')
    .test('is-11-digit', 'Identification number must be 11 digits', value => {
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
