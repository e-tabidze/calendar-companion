import { useTranslation } from 'react-i18next'
import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import useLogin from './useLogin'
import { DefaultInput } from 'src/views/components/input'
import CheckboxField from 'src/views/components/checkboxField'
import Link from 'next/link'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'

const LoginPage = () => {
  const { t } = useTranslation()

  const { control, errors, handleSubmit, loginValues } = useLogin()

  console.log(errors, 'errors')

  const options = [
    {
      id: 1,
      title: (
        <Typography type='subtitle' color='light'>
          Remember for 30 days
        </Typography>
      )
    }
  ]

  console.log(loginValues, 'registerValues')

  const onSubmit = (data: any) => {
    console.log('Form Data:', data)
  }

  const onError = (errors: any) => {
    console.log('Errors:', errors)
  }

  return (
    <UnauthorizedLayout>
      <div className='flex flex-col items-center gap-8 pb-8'>
        <div className='text-center lg:mx-9'>
          <Typography type='h1'>{t('register.createAccount')}</Typography>
          <Typography type='h5' color='light'>
            {t('register.createAccountCaption')}
          </Typography>
        </div>

        <button
          className='relative w-full rounded-lg bg-grey-70 p-4 text-center'
        >
          <div className="h-8 w-8 absolute top-3 bg-[url('/images/google-sign-in-icon.png')]" />
          {t('register.signInWithGoogle')}
        </button>

        <Typography type='subtitle' color='light'>
          {t('register.or')}
        </Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className='flex flex-col gap-6'>
          <DefaultInput name='email' control={control} label='Email Address' errors={errors} />

          <DefaultInput name='password' type='password' control={control} label='Password' errors={errors} />

          <div className='flex justify-between items-center '>
            <CheckboxField control={control} name='remember_account' options={options} errors={errors} />
            <Link href='' className='text-blue-110 text-2sm hover:underline'>
              Forgot password?
            </Link>
          </div>
        </div>

        <div className='mt-10 flex w-full justify-center'>
          <div className='flex w-full flex-col items-center gap-4 lg:w-[364px]'>
            <DefaultButton
              text='Create new account'
              bg='bg-purple-100'
              className='w-full h-12 rounded-lg'
              type='submit'
            />
            <div className='flex gap-1'>
              <Typography type='subtitle' color='light'>
                New to Companion AI
              </Typography>{' '}
              <Link href='/signin' className='text-2sm'>
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </form>
    </UnauthorizedLayout>
  )
}

export default LoginPage
