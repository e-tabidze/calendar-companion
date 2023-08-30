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
    isSameTime: true,
    working_hours: {
      monday: {
        startTime: '09:00',
        endTime: '18:00',
        isSelected: true
      },
      tuesday: {
        startTime: '09:00',
        endTime: '18:00',
        isSelected: true
      },
      wednesday: {
        startTime: '09:00',
        endTime: '18:00',
        isSelected: true
      },
      thursday: {
        startTime: '09:00',
        endTime: '18:00',
        isSelected: true
      },
      friday: {
        startTime: '09:00',
        endTime: '18:00',
        isSelected: true
      },
      saturday: {
        startTime: '',
        endTime: '',
        isSelected: false
      },
      sunday: {
        startTime: '',
        endTime: '',
        isSelected: false
      }
    }
  }

  const createCompanyDefaultValues = {
    identification_number: null,
    company_type_id: '1',
    company_information: {
      name: '',
      description: '',
      logo: '',
      contactInformation: {
        email: '',
        phoneNumbers: [{}, {}]
      },
      address: [defaultAddress]
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
    reValidateMode: 'onChange',
    defaultValues: createCompanyDefaultValues
    // resolver: yupResolver(CompanySchema)
  })

  const { fields: addressFields, append: appendAddress } = useFieldArray({
    control,
    name: 'company_information.address'
  })

  const { fields: phoneFields, append: appendPhone } = useFieldArray({
    control,
    name: 'company_information.contactInformation.phoneNumbers'
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
    phoneFields,
    appendPhone,
    defaultAddress
  }
}

export default useCreateCompany
