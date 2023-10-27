import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NewProductSchema } from 'src/@core/validation/newProductSchema'
import useCompanyInfo from './useCompanyInfo'
import { CompanyAddress } from 'src/types/Company'

const useCompany = (id: number) => {
  const { companyInfo } = useCompanyInfo(id)

  console.log(companyInfo, 'companyInfo')

  const defaultAddress: CompanyAddress[] = companyInfo?.addresses?.map((address: any) => ({
    id: address.id,
    address: address.address,
    phone: address.phone,
    email: address.email,
    city: address.city,
    state: address.state,
    postal_code: address.postal_code,
    lat: address.lat,
    long: address.long,
    is_same_time: address.is_same_time,
    working_hours: {
      monday: {
        start_time: address?.working_hours?.monday?.start_time,
        end_time: address?.working_hours?.monday?.end_time,
        is_selected: address?.working_hours?.monday?.is_selected
      },
      tuesday: {
        start_time: address?.working_hours?.tuesday?.start_time,
        end_time: address?.working_hours?.tuesday?.end_time,
        is_selected: address?.working_hours?.tuesday?.is_selected
      },
      wednesday: {
        start_time: address?.working_hours?.wednesday?.start_time,
        end_time: address?.working_hours?.wednesday?.end_time,
        is_selected: address?.working_hours?.wednesday?.is_selected
      },
      thursday: {
        start_time: address?.working_hours?.thursday?.start_time,
        end_time: address?.working_hours?.thursday?.end_time,
        is_selected: address?.working_hours?.thursday?.is_selected
      },
      friday: {
        start_time: address?.working_hours?.friday?.start_time,
        end_time: address?.working_hours?.friday?.end_time,
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

  const defaultEmptyAddress: CompanyAddress = {
    address: '',
    phone: '',
    email: '',
    city: '',
    state: '',
    postal_code: '',
    lat: '',
    id: '',
    is_same_time: 1,
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

  const defaultValues = {
    company_id: id,
    identification_number: companyInfo?.identification_number,
    company_information: {
      name: companyInfo?.information?.name,
      logo: '',
      description: companyInfo?.information?.description,
      email: companyInfo?.information?.email,
      phone_numbers: companyInfo?.information?.phone_numbers
    },
    addresses: defaultAddress
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

    // @ts-ignore
    resolver: yupResolver(NewProductSchema)
  })

  const {
    fields: addressFields,
    append: appendAddress,
    remove
  } = useFieldArray({
    control,
    name: 'addresses'
  })

  const companyValues: any = useWatch({ control })

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
    remove
  }
}

export default useCompany
