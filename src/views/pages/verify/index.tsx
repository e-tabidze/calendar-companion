import { useRouter } from 'next/router'
import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import Icon from 'src/views/app/Icon'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'

const VerifyPage = () => {
  const router = useRouter()

  return (
    <UnauthorizedLayout>
      <div className='flex flex-col items-center gap-12 text-center'>
        <Typography type='h1'>Please verify your email address by following link in your inbox</Typography>

        <Icon svgPath='emailSentBot' width={136} height={120} />

        <Typography type='h5' color='light'>
          {`Thank you for signing up with us! We are almost there. To complete your account setup and enjoy all our
  services, please check your `}
          <span className='text-primary-100'>{router.query.email}</span>
          {` email inbox. We've sent you a verification link. Just click on it to verify your
  account and get started. If you don't see the email, please check your spam folder. We're excited to have you
  on board!`}
        </Typography>
      </div>

      <div className='mt-8 flex flex-col items-center'>
        <div className='flex w-full flex-col gap-3 text-center lg:w-96'>
          <DefaultButton text='Resend confirmaion link' bg='bg-primary-100' className='p-4 rounded-lg' />
        </div>
      </div>
    </UnauthorizedLayout>
  )
}

export default VerifyPage
