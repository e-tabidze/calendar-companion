import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { NewProductSchema } from 'src/@core/validation/newProductSchema'
import useCompanyInfo from './useCompanyInfo'

const useCompany = (id: number) => {
  const { companyInfo } = useCompanyInfo(id)

  console.log(companyInfo, 'companyInfo')

  const defaultWorkDayWorkingTime = companyInfo?.addresses?.map((address: any) => ({
    start_time: address.working_hours?.start_time,
    end_time: address.working_hours.working_hours?.end_time
  }))

  const defaultAddress = companyInfo?.addresses?.map((address: any) => ({
    id: address.id,
    address: address.address,
    phone: address.phone,
    email: address.email,
    city: address.city,
    state: address.state,
    postal_code: address.postal_code,
    lat: address.lat,
    long: address.long,
    working_hours: {
      monday: defaultWorkDayWorkingTime,
      tuesday: defaultWorkDayWorkingTime,
      wednesday: defaultWorkDayWorkingTime,
      thursday: defaultWorkDayWorkingTime,
      friday: defaultWorkDayWorkingTime,
      saturday: defaultWorkDayWorkingTime,
      sunday: defaultWorkDayWorkingTime
    }
  }))

  const defaultValues = {
    company_id: id,
    identification_number: companyInfo?.identification_number,
    company_information: {
      name: companyInfo?.information?.name,
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
    defaultValues,

    // @ts-ignore
    resolver: yupResolver(NewProductSchema)
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
    companyValues
  }
}

export default useCompany
