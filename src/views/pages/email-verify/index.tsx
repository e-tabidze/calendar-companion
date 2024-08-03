import { t } from 'i18next'
import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import Icon from 'src/views/app/Icon'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'

const EmailVerifyPage = () => {

  return (
    <UnauthorizedLayout>
      <div className='flex flex-col items-center gap-12 text-center'>
        <Typography type='h1'>
          {/* {t('verifyEmail')} */}
          Please verify your email address by following link in your inbox
        </Typography>

        <Icon svgPath='emailSentBot' width={136} height={120} />

        <Typography type='h5' color='light'>
          {/* {t('verifyEmailCaption1')}{' '} */}
          {`Thank you for signing up with us! We are almost there. To complete your account setup and enjoy all our
          services, please check your  email inbox. We've sent you a verification link. Just click on it to verify your
          account and get started. If you don't see the email, please check your spam folder. We're excited to have you
          on board!`}
        </Typography>

        <div className='text-sm text-secondary-2'></div>
      </div>

      <div className='mt-8 flex flex-col items-center'>
        <div className='flex w-full flex-col gap-3 text-center lg:w-96'>
          <DefaultButton text={t('resend')} bg='bg-purple-100' className='p-4 rounded-lg' />
        </div>
      </div>
    </UnauthorizedLayout>
  )
}

export default EmailVerifyPage
