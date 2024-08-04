import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import ProgressBar from '../getting-started/progressBar'
import { DefaultButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'

const ConnectAccountPage = () => {
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
          <div className='mt-10 flex w-full justify-center'>
            <div className='flex w-full flex-col items-center gap-4 lg:w-[364px]'>
              <DefaultButton text='Next Step' bg='bg-purple-100' className='w-full h-12 rounded-lg' />
            </div>
          </div>
        </div>
      </div>
    </UnauthorizedLayout>
  )
}

export default ConnectAccountPage
