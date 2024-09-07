import { useForm, useWatch } from 'react-hook-form'
import { Workspace } from 'src/types/auth'
import AuthService from 'src/services/AuthService'
import { yupResolver } from '@hookform/resolvers/yup'
import { WorkspaceSchema } from 'src/@core/validation/WorkspaceSchema'
import { useEffect } from 'react'

const useWorkspace = (userData: any) => {
  const workspaceDefaultValues = {
    title: '',
    workspace_type_id: 1,
    workspace_information: {
      title: ''
    }
  }

  const isIdentificationNumberSet = Boolean(userData?.active_profile?.title)

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

  useEffect(() => {
    setValue('title', userData ? userData?.active_profile?.title : '')
  }, [userData, setValue])

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
