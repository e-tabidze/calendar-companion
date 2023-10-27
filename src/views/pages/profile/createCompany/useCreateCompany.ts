import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { CompanySchema } from 'src/@core/validation/companySchema'
import { Company } from 'src/types/Company'
import CompanyService from 'src/services/CompanyService'
import locationService from 'src/services/locationService'

const useCreateCompany = () => {
  const defaultWorkDayWorkingTime = {
    start_time: '09:00',
    end_time: '18:00',
    is_selected: true
  }

  const defaultWeekendWorkingTime = {
    start_time: '',
    end_time: '',
    is_selected: false
  }

  const defaultAddress = {
    address: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    postal_code: '',
    lat: '',
    long: '',
    is_same_time: true,
    start_time: '09:00',
    end_time: '18:00'
    working_hours: {
      monday: defaultWorkDayWorkingTime,
      tuesday: defaultWorkDayWorkingTime,
      wednesday: defaultWorkDayWorkingTime,
      thursday: defaultWorkDayWorkingTime,
      friday: defaultWorkDayWorkingTime,
      saturday: defaultWeekendWorkingTime,
      sunday: defaultWeekendWorkingTime
    }
  }

  const createCompanyDefaultValues = {
    identification_number: null,
    company_type_id: '1',
    company_information: {
      name: '',
      logo: '',
      description: '',
      email: '',
      phone_numbers: ''
    },
    addresses: [defaultAddress]
  }

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: createCompanyDefaultValues,
    resolver: yupResolver(CompanySchema)
  })

  const { fields: addressFields, append: appendAddress } = useFieldArray({
    control,
    name: 'addresses',
    rules: {minLength: 1}
  })

  const companyValues: any = useWatch({ control })

  const createCompany = async (params: { AccessToken: any; company: Company }) => {
    const { AccessToken, company } = params

    try {
      const response: any = await CompanyService.createCompany(AccessToken, company)

      return response.data
    } catch (error) {
      console.error('Error creating company:', error)
      throw error
    }
  }

  const getLocationSuggestions = async (address: string) => {
    try {
      const response: any = await locationService.getLocationSuggestions(address)

      return response.data
    } catch (error) {
      console.error('Error fetching location suggestions:', error)
      throw error
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    companyValues,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    addressFields,
    appendAddress,
    defaultAddress,
    createCompany,
    getLocationSuggestions
  }
}

export default useCreateCompany
