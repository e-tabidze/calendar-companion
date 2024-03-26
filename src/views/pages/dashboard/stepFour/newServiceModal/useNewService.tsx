import { useForm, useWatch } from 'react-hook-form'
import { NewService } from 'src/types/Product'
import CompanyService from 'src/services/CompanyService'
import { useQueryClient } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { NewServiceSchema } from 'src/@core/validation/newServiceSchema'

const useNewService = () => {
  const newServiceDefaultValues = {
    title: '',
    title_en: '',
    description: '',
    description_en: '',
    type_id: '',
    has_quantity: NaN, 
  }

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: newServiceDefaultValues,
    resolver: yupResolver(NewServiceSchema)
  })

  const serviceValues: any = useWatch({ control })

  const queryClient = useQueryClient()

  const createNewService = async (service: NewService, AccessToken: string) => {
    try {
      const response: any = await CompanyService.postCompanyServices(service, AccessToken)

      await queryClient.invalidateQueries(['companyServices'])
      reset()

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
