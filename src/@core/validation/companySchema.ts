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

function isValidIBANNumber(input: string): boolean | number {
  const CODE_LENGTHS: { [key: string]: number } = {
    AD: 24,
    AE: 23,
    AT: 20,
    AZ: 28,
    BA: 20,
    BE: 16,
    BG: 22,
    BH: 22,
    BR: 29,
    CH: 21,
    CY: 28,
    CZ: 24,
    DE: 22,
    DK: 18,
    DO: 28,
    EE: 20,
    ES: 24,
    FI: 18,
    FO: 18,
    FR: 27,
    GB: 22,
    GI: 23,
    GL: 18,
    GR: 27,
    GT: 28,
    HR: 21,
    HU: 28,
    IE: 22,
    IL: 23,
    IS: 26,
    IT: 27,
    JO: 30,
    KW: 30,
    KZ: 20,
    LB: 28,
    LI: 21,
    LT: 20,
    LU: 20,
    LV: 21,
    MC: 27,
    MD: 24,
    ME: 22,
    MK: 19,
    MR: 27,
    MT: 31,
    MU: 30,
    NL: 18,
    NO: 15,
    PK: 24,
    PL: 28,
    PS: 29,
    PT: 25,
    QA: 29,
    RO: 24,
    RS: 22,
    SA: 24,
    SE: 24,
    SI: 19,
    SK: 24,
    SM: 27,
    TN: 24,
    TR: 26,
    AL: 28,
    BY: 28,
    CR: 22,
    EG: 29,
    GE: 22,
    IQ: 23,
    LC: 32,
    SC: 31,
    ST: 25,
    SV: 28,
    TL: 23,
    UA: 29,
    VA: 22,
    VG: 24,
    XK: 20
  }

  const iban = String(input)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '') 
  const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/) // match and capture (1) the country code, (2) the check digits, and (3) the rest

  if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
    return false
  }

 const  digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, function (letter: string): any {
    return letter.charCodeAt(0) - 55
  })

  // final check
  return mod97(digits) === 1
}

function mod97(string: any): number {
  let checksum = string.slice(0, 2)
  let fragment

  for (let offset = 2; offset < string.length; offset += 7) {
    fragment = String(checksum) + string.substring(offset, offset + 7)
    checksum = parseInt(fragment, 10) % 97
  }

  return checksum
}

const CompanyInfoSchema = Yup.object<CompanyInfo>().shape({
  name: Yup.string().required('required_field'),
  legal_name: Yup.string().required('required_field'),
  logo: Yup.string().required('upload_company_logo'),
  description: Yup.string().required('required_field'),
  description_en: Yup.string().required('required_field'),
  email: Yup.string().required('required_field').email('email_format_error'),
  phone_numbers: Yup.string().required('required_field').max(9, 'max_9_number'),
  iban: Yup.string()
    .required('required_field')
    .test('is-valid-iban', function (value) {
      const { path, createError } = this
      if (!value) {
        return createError({ path, message: 'required_field' })
      }

      const isValid = isValidIBANNumber(value)
      if (isValid !== true) {
        const first4 = value.substring(0, 4)
        
        return createError({ path, message: `IBAN format error: ${first4}...` })
      }

      return true
    })
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
