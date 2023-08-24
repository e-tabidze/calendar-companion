import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useDispatch } from 'react-redux'
import { CompanySchema } from 'src/@core/validation/companySchema'
import { AppDispatch } from 'src/store'
import { Company } from 'src/types/Company'

const useCreateCompany = () => {
  const dispatch = useDispatch<AppDispatch>()

  const defaultWorkingTime = {
    startTime: '',
    endTime: ''
  }

  const defaultAddress = {
    address: '',
    city: '',
    state: '',
    postal_code: '',
    working_hours: {
      monday: { ...defaultWorkingTime },
      tuesday: { ...defaultWorkingTime },
      wednesday: { ...defaultWorkingTime },
      thursday: { ...defaultWorkingTime },
      friday: { ...defaultWorkingTime },
      saturday: { ...defaultWorkingTime },
      sunday: { ...defaultWorkingTime }
    }
  }

  const createCompanyDefaultValues = {
    identification_number: null,
    company_type_id: '1',
    company_information: {
      name: '',
      description: '',
      logo: '',
      contact: {
        email: '',
        officeNumber: '',
        mobile: [null]
      },
      address: [defaultAddress],
    }
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
    defaultValues: createCompanyDefaultValues
    // resolver: yupResolver(CompanySchema)
  })

  const { fields: addressFields, append: appendAddress } = useFieldArray({
    control,
    name: 'company_information.address'
  })

  const { fields: mobileFields, append: appendMobile } = useFieldArray({
    control,
    name: 'company_information.contact.mobile'
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
    mobileFields,
    appendMobile
  }
}

export default useCreateCompany
