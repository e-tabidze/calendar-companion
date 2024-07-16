import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCompanyInfo from '../../../../hooks/useCompanyInfo'
import { Company, CompanyAddress, WorkingTime } from 'src/types/Company'
import { CompanySchema } from 'src/@core/validation/companySchema'
import CompanyService from 'src/services/CompanyService'
import { useEffect } from 'react'

const useCompany = (id: number) => {
  const { companyInfo, singleCompanyBranches } = useCompanyInfo(id)

  console.log(companyInfo?.addresses, 'companyInfo?.addresses')

  const defaultAddress: CompanyAddress[] = companyInfo?.addresses?.map((address: any) => ({
    id: address.id,
    dummyAddressId: address.id,
    address: address.address,
    phone: address.phone,
    email: address.email,
    city: address.city.id,
    state: address.state,
    postal_code: address.postal_code,
    lat: address.lat || '',
    long: address.long || '',
    is_same_time: address.is_same_time,
    start_time: address.start_time || '09:00:00',
    end_time: address.end_time || '18:00:00',
    working_hours: {
      monday: {
        start_time: address?.working_hours?.monday?.start_time || '09:00:00',
        end_time: address?.working_hours?.monday?.end_time || '18:00:00',
        is_selected: address?.working_hours?.monday?.is_selected
      },
      tuesday: {
        start_time: address?.working_hours?.tuesday?.start_time || '09:00:00',
        end_time: address?.working_hours?.tuesday?.end_time || '18:00:00',
        is_selected: address?.working_hours?.tuesday?.is_selected
      },
      wednesday: {
        start_time: address?.working_hours?.wednesday?.start_time || '09:00:00',
        end_time: address?.working_hours?.wednesday?.end_time || '18:00:00',
        is_selected: address?.working_hours?.wednesday?.is_selected
      },
      thursday: {
        start_time: address?.working_hours?.thursday?.start_time || '09:00:00',
        end_time: address?.working_hours?.thursday?.end_time || '18:00:00',
        is_selected: address?.working_hours?.thursday?.is_selected
      },
      friday: {
        start_time: address?.working_hours?.friday?.start_time || '09:00:00',
        end_time: address?.working_hours?.friday?.end_time || '18:00:00',
        is_selected: address?.working_hours?.friday?.is_selected
      },
      saturday: {
        start_time: address?.working_hours?.saturday?.start_time,
        end_time: address?.working_hours?.saturday?.end_time,
        is_selected: address?.working_hours?.saturday?.is_selected
      },
      sunday: {
        start_time: address?.working_hours?.sunday?.start_time,
        end_time: address?.working_hours?.sunday?.end_time,
        is_selected: address?.working_hours?.sunday?.is_selected
      }
    }
  }))

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

  const defaultEmptyAddress: CompanyAddress = {
    address: '',
    phone: 0,
    email: '',
    city: '',
    state: '',
    postal_code: '',
    lat: '',
    long: '',
    id: '',
    is_same_time: 1,
    start_time: '09:00:00',
    end_time: '18:00:00',
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

  const defaultValues: Company = {
    company_id: id,
    identification_number: companyInfo?.identification_number,
    company_type_id: companyInfo.company_type_id,
    company_information: {
      name: companyInfo?.information?.name,
      legal_name: companyInfo?.information?.legal_name,
      logo: companyInfo?.information?.logo,
      description: companyInfo?.information?.description,
      description_en: companyInfo?.information?.description_en,
      email: companyInfo?.information?.email,
      phone_numbers: companyInfo?.information?.phone_numbers,
      iban: companyInfo?.information?.iban,
    },
    addresses: defaultAddress,
    terms_and_conditions: '1'
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
    defaultValues,
    resolver: yupResolver(CompanySchema)
  })

  useEffect(() => {
    setValue('identification_number', companyInfo?.identification_number)
    setValue('company_information.name', companyInfo?.information?.name)
    setValue('company_information.description', companyInfo?.information?.description)
    setValue('company_information.description_en', companyInfo?.information?.description_en)
    setValue('company_information.email', companyInfo?.information?.email)
    setValue('company_information.logo', companyInfo?.information?.logo)
    setValue('company_id', id)
    setValue('addresses', defaultAddress)
    setValue('terms_and_conditions', companyInfo?.terms_and_conditions)
  }, [setValue, id, singleCompanyBranches])

  const {
    fields: addressFields,
    append: appendAddress,
    remove
  } = useFieldArray({
    control,
    name: 'addresses'
  })

  const companyValues: any = useWatch({ control })

  const updateCompanyInfo = async (company: Company) => {
    try {
      const response: any = await CompanyService.updateCompanyInfo('', id, company)

      return response.data
    } catch (error) {
      console.error('Error updating company info:', error)
      throw error
    }
  }

  const deleteCompany = async () => {
    try {
      const response: any = await CompanyService.deleteCompany('', id)

      return response
    } catch (error) {
      console.error('Error deleting company:', error)
      throw error
    }
  }

  const deleteCompanyAddress = async (adressId: number) => {
    try {
      const response: any = await CompanyService.deleteCompanyAddress('', adressId)

      return response
    } catch (error) {
      console.error('Error deleting company address:', error)
      throw error
    }
  }

  return {
    control,
    handleSubmit,
    errors,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    companyValues,
    addressFields,
    appendAddress,
    defaultEmptyAddress,
    remove,
    updateCompanyInfo,
    deleteCompany,
    deleteCompanyAddress
  }
}

export default useCompany
