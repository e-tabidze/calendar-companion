import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useCompanyInfo from '../../../../hooks/useCompanyInfo'
import { Company, CompanyAddress, WorkingTime } from 'src/types/Company'
import { CompanySchema } from 'src/@core/validation/companySchema'
import CompanyService from 'src/services/CompanyService'
import { useEffect } from 'react'

const useCompany = (id: number) => {
  const { companyInfo } = useCompanyInfo(id)

  const defaultAddress: CompanyAddress[] = companyInfo?.addresses?.map((address: any) => ({
    id: address.id,
    dummyAddressId: address.id,
    address: address.address,
    phone: address.phone,
    email: address.email,
    city: address.city,
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
    company_type_id: companyInfo?.company_type_id,
    company_information: {
      name: companyInfo?.information?.name,
      legal_name: companyInfo?.information?.legal_name,
      logo: '',
      description: companyInfo?.information?.description,
      description_en: companyInfo?.information?.description_en,
      email: companyInfo?.information?.email,
      phone_numbers: companyInfo?.information?.phone_numbers,
      iban: companyInfo?.information?.iban
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
    setValue,
    reset
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
    resolver: yupResolver(CompanySchema)
  })

  const {
    fields: addressFields,
    append: appendAddress,
    remove
  } = useFieldArray({
    control,
    name: 'addresses'
  })

  useEffect(() => {
    if (companyInfo) {
      const updatedDefaultValues: Company = {
        company_id: id,
        identification_number: companyInfo.identification_number,
        company_type_id: companyInfo.company_type_id,
        company_information: {
          name: companyInfo.information.name,
          legal_name: companyInfo.information.legal_name,
          logo: '',
          description: companyInfo.information.description,
          description_en: companyInfo.information.description_en,
          email: companyInfo.information.email,
          phone_numbers: companyInfo.information.phone_numbers,
          iban: companyInfo.information.iban
        },
        addresses: defaultAddress,
        terms_and_conditions: companyInfo.terms_and_conditions
      }

      reset(updatedDefaultValues)
    }
  }, [companyInfo, id, reset])

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
    updateCompanyInfo
  }
}

export default useCompany
