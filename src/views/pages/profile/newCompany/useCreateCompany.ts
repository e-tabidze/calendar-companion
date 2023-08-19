import { useForm, useWatch } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useDispatch } from 'react-redux'
import { CompanySchema } from 'src/@core/validation/companySchema'
import { AppDispatch } from 'src/store'
import { Company } from 'src/types/Company'

const useCreateCompany = () => {
  const dispatch = useDispatch<AppDispatch>()

  const createCompanyDefaultValues: Company = {
    identification_number: null as number | null,
    company_type_id: "1",
    company_information: {
      name: '',
      description: '',
      logo: '',
      address: [
        {
          address: '',
          city: '',
          state: '',
          postal_code: '',
          working_hours: {
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: ''
          }
        }
      ]
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    resetField,
    setError,
    clearErrors
  } = useForm({ mode: 'onChange', defaultValues: createCompanyDefaultValues, resolver: yupResolver(CompanySchema) })

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
    clearErrors
  }
}

export default useCreateCompany
