import * as Yup from 'yup'
import { Company, CompanyAddress, CompanyInfo, WorkingHours, WorkingTime } from 'src/types/Company'

const WorkingTimeSchema = Yup.object<WorkingTime>().shape({
  start_time: Yup.string().nullable(),
  end_time: Yup.string().nullable(),
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
  city: Yup.string().required('required_field'),

  address: Yup.string().required('required_field'),

  phone: Yup.number()
    .required('required_field')
    .typeError('phone_is_number')
    .test('is-9-digit', 'max_9_symbol', value => {
      if (value === null || value === undefined) {
        return true
      }
      const numericValue = parseFloat(value.toString())

      return !isNaN(numericValue) && numericValue.toString().length <= 9
    }),
  email: Yup.string().email('email_format_error').nullable(),
  lat: Yup.string().nullable(),
  long: Yup.string().nullable(),
  working_hours: WorkingHoursSchema
})

const CompanyInfoSchema = Yup.object<CompanyInfo>().shape({
  name: Yup.string().required('required_field'),
  legal_name: Yup.string().required('required_field'),
  logo: Yup.string().required('upload_company_logo'),
  description: Yup.string().required('required_field'),
  email: Yup.string().required('required_field').email('email_format_error'),
  phone_numbers: Yup.string().required('required_field').max(9, 'max_9_number')
})

const CompanySchema = Yup.object<Company>().shape({
  identification_number: Yup.number()
    .required('required_field')
    .typeError('identification_number_is_number')
    .test('is-11-digit', 'identification_number_11_digit', value => {
      if (value === null || value === undefined) {
        return true
      }
      const numericValue = parseFloat(value.toString())

      return !isNaN(numericValue) && numericValue.toString().length === 11
    }),

  company_type_id: Yup.mixed().required('Company type is required'),

  company_information: CompanyInfoSchema,

  addresses: Yup.array<CompanyAddress>().of(CompanyAddressSchema),

  company_id: Yup.mixed()
})

export { CompanySchema }
