import { useTranslation } from 'react-i18next'
import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import { DefaultButton } from 'src/views/components/button'
import { DefaultInput } from 'src/views/components/input'
import Typography from 'src/views/components/typography'
import usePasswordReset from './useResetPassword'
import Link from 'next/link'

const ResetPasswordPage = () => {
  const { t } = useTranslation()

  const { control, errors } = usePasswordReset()

  return (
    <UnauthorizedLayout>
      <div>
        <div className='text-center flex flex-col gap-4 lg:mx-9 mb-8'>
          <Typography type='h1'>{t('Forgot your Password?')}</Typography>
          <Typography type='h5' color='light'>
            {/* {t('register.createAccountCaption')} */}
            Tell us the email address associated with your account and we'll send you an email with a link to reset your
            password
          </Typography>
        </div>

        <DefaultInput name='email' control={control} label='Email Address' errors={errors} />
      </div>

      <div className='mt-10 flex w-full justify-center'>
        <div className='flex w-full flex-col items-center gap-4 lg:w-[364px]'>
          <DefaultButton
            text='Create new account'
            bg='bg-grey-70'
            className='w-full h-12 rounded-lg !text-raisin-70'
            type='submit'
          />

          <Link href='/signin' className='text-md hover:underline text-blue-130'>
            Back to Login
          </Link>
        </div>
      </div>
    </UnauthorizedLayout>
  )
}

export default ResetPasswordPage
