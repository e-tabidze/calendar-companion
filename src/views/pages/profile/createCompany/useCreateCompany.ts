import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { CompanySchema } from 'src/@core/validation/companySchema'
import { Company, CompanyAddress, WorkingTime } from 'src/types/Company'
import CompanyService from 'src/services/CompanyService'
import MapService from 'src/services/MapService'
import StaticService from 'src/services/StaticService'

const useCreateCompany = () => {
  const defaultWorkDayWorkingTime: WorkingTime = {
    start_time: '09:00',
    end_time: '18:00',
    is_selected: true
  }

  const defaultWeekendWorkingTime: WorkingTime = {
    start_time: '',
    end_time: '',
    is_selected: false
  }

  const defaultAddress: CompanyAddress = {
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
    end_time: '18:00',
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

  const createCompanyDefaultValues: Company = {
    identification_number: 0,
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
    formState: { errors, dirtyFields, isValid },
    resetField,
    setError,
    clearErrors,
    setValue,
    trigger
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: createCompanyDefaultValues,
    resolver: yupResolver(CompanySchema)
  })

  const { fields: addressFields, append: appendAddress } = useFieldArray({
    control,
    name: 'addresses',
    rules: { minLength: 1 }
  })

  const companyValues: any = useWatch({ control })

  const createCompany = async (AccessToken = '', company: Company) => {
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
      const response: any = await MapService.getLocationSuggestions(address)

      return response.data
    } catch (error) {
      console.error('Error fetching location suggestions:', error)
      throw error
    }
  }

  const uploadCompanyLogo = async (File: any) => {
    try {
      const response: any = await StaticService.postUploadCompanyLogo('', File)

      return response.data
    } catch (error) {
      console.error('Error fetching location suggestions:', error)
      throw error
    }
  }

  const saveCompanyLogo = async (AccessToken: string, Logo: any, companyId: number | string) => {
    try {
      const response: any = await StaticService.postSaveCompanyLogo(AccessToken, Logo, companyId)

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
    getLocationSuggestions,
    uploadCompanyLogo,
    saveCompanyLogo,
    isValid,
    trigger
  }
}

export default useCreateCompany
