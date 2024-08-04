import { useForm, useWatch } from 'react-hook-form'
import { Workspace } from 'src/types/auth'
import AuthService from 'src/services/AuthService'
import { yupResolver } from '@hookform/resolvers/yup'
import { WorkspaceSchema } from 'src/@core/validation/WorkspaceSchema'
import { useEffect } from 'react'

const useWorkspace = (userData: any) => {
  const workspaceDefaultValues = {
    identification_number: '',
    company_type_id: 1,
    company_information: {
      title: ''
    }
  }

  useEffect(() => {
    setValue('identification_number', userData ? userData?.active_profile?.identification_number : '')
  }, [userData])

  const isIdentificationNumberSet = Boolean(userData?.active_profile?.identification_number)

  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, isValid },
    trigger,
    resetField,
    setError,
    clearErrors,
    setValue
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: workspaceDefaultValues,
    resolver: yupResolver(WorkspaceSchema)
  })

  const workspaceValues: any = useWatch({ control })

  const postWorkspace = async (AccessToken = '', workspace: Workspace) => {
    try {
      const response: any = await AuthService.postWorkspace(AccessToken, workspace)

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
    isValid,
    resetField,
    setError,
    clearErrors,
    setValue,
    trigger,
    workspaceValues,
    postWorkspace,
    isIdentificationNumberSet
  }
}

export default useWorkspace
