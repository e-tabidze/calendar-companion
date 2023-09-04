import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useDispatch } from 'react-redux'
import { CompanySchema } from 'src/@core/validation/companySchema'
import { AppDispatch } from 'src/store'

const useCreateCompany = () => {
  const dispatch = useDispatch<AppDispatch>()

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
    isSameTime: true,
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
    name: 'addresses'
  })

  const companyValues: any = useWatch({ control })

  return {
    control,
    handleSubmit,
    errors,
    dispatch,
    companyValues,
    dirtyFields,
    resetField,
    setError,
    clearErrors,
    setValue,
    addressFields,
    appendAddress,
    defaultAddress
  }
}

export default useCreateCompany
