import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import ProgressBar from '../getting-started/progressBar'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import Link from 'next/link'
import Icon from 'src/views/app/Icon'

const ConnectAccountPage = () => {
  return (
    <UnauthorizedLayout>
      <div className='h-full flex flex-col'>
        <ProgressBar currentStep={3} totalSteps={5} />
        <div className='flex flex-col items-center gap-8 pb-8 mt-16'>
          <div className='text-center lg:mx-9'>
            <Typography type='h1'>Connect your platforms</Typography>
            <Typography type='h5' color='light'>
              Connecting your Google account will let you to view your calendar, schedule meetings, collaborate with
              your team members and use our bot
            </Typography>
          </div>
        </div>

        <button className='relative w-full rounded-lg bg-grey-70 p-4 text-center'>
          <div className="h-8 w-8 absolute top-3 bg-[url('/images/google-meet.png')]" />
          Connect your google account
          <Icon svgPath='connect' width={24} height={24} color='#43786A' className='absolute right-3 top-4' />
        </button>

        <div className='flex gap-1'>
          <Typography type='subtitle' color='light' className='text-center mt-8'>
            By clicking "Connect with Google", you acknowledge that you have read and understood, and agree to {' '}
            <Link href='/terms_and_conditions' className='text-2sm hover:underline text-purple-100'>
              Companion AI's Terms & Conditions and Privacy Policy
            </Link>
          </Typography>
        </div>
      </div>
      <DefaultButton text='Ok! Lets jump in' bg='bg-purple-100' className='w-full h-12 rounded-lg' type='submit' />
    </UnauthorizedLayout>
  )
}

export default ConnectAccountPage
