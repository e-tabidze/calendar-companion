import { useForm, useWatch } from 'react-hook-form'
import { NewService } from 'src/types/Product'
import CompanyService from 'src/services/CompanyService'

const useNewService = () => {
  const newServiceDefaultValues = {
    company_id: 102,
    title: '',
    description: '',
    type_id: ''
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
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: newServiceDefaultValues
  })

  const serviceValues: any = useWatch({ control })

  const createNewService = async (service: NewService, AccessToken: string) => {
    try {
      const response: any = await CompanyService.postCompanyServices(service, AccessToken)

      return response.data
    } catch (error) {
      console.error('Error creating product:', error)
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
    serviceValues,
    createNewService
  }
}

export default useNewService
