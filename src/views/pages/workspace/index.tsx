import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DefaultButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import useWorkspace from './useWorkspace'
import { useRouter } from 'next/router'
import useUserData from 'src/hooks/useUserData'
import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import ProgressBar from '../getting-started/progressBar'
import { handleUserRedirection } from 'src/utils/handleUserRedirection'
import { useWatch } from 'react-hook-form'

const WorkspacePage = () => {
  const { userData } = useUserData()
  const { control, postWorkspace, workspaceValues, errors, isIdentificationNumberSet } = useWorkspace(userData)

  const { title } = useWatch({ control })

  const queryClient = useQueryClient()

  const router = useRouter()

  const postWorkspaceMutation = useMutation(
    () => {
      return postWorkspace('', workspaceValues)
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['userInfo'])

        handleUserRedirection(userData, router)
      },
      onError: (response: any) => {
        if (response.response.status === 400 && response.response.data.result.message === 'User Already Exists') {
          console.log('User Already Exists')
        }
      }
    }
  )

  const onSubmit = () => {
    postWorkspaceMutation.mutate(workspaceValues)
  }

  return (
    <UnauthorizedLayout>
      <div className='h-full flex flex-col'>
        <ProgressBar currentStep={3} totalSteps={5} />
        <div className='flex flex-col items-center gap-8 pb-8 mt-16'>
          <div className='text-center lg:mx-9'>
            <Typography type='h1'>Create your workspace</Typography>
            <Typography type='h5' color='light'>
              Workspaces are essential on our platform. This is how you collaborate and share information with your team
            </Typography>
          </div>
        </div>

        <div className='flex-1 shrink-0 flex flex-col justify-between'>
          <DefaultInput
            name='title'
            control={control}
            label='Workspace name'
            errors={errors}
            disabled={isIdentificationNumberSet}
          />

          <div className='mt-10 flex w-full justify-center'>
            <div className='flex w-full flex-col items-center gap-4 lg:w-[364px]'>
              <DefaultButton
                text='Next Step'
                bg='bg-primary-100'
                className='w-full h-12 rounded-lg'
                onClick={onSubmit}
                disabled={isIdentificationNumberSet || !title}
              />
            </div>
          </div>
        </div>
      </div>
    </UnauthorizedLayout>
  )
}

export default WorkspacePage
