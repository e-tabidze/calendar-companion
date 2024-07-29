import { useTranslation } from 'react-i18next'
import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import useRegister from '../useRegister'
import { DefaultInput } from 'src/views/components/input'
import CheckboxField from 'src/views/components/checkboxField'
import Link from 'next/link'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'

const RegisterPage = () => {
  const { t } = useTranslation()

  const { control, errors } = useRegister()

  const options = [
    {
      id: 1,
      title: (
        <>
          {t('agree')}
          <Link href='/rules' target='_blank' className='ml-2 text-blue-100'>
            {t('terms_and_conditions')}
          </Link>
        </>
      )
    }
  ]

  return (
    <UnauthorizedLayout>
      <div className='flex flex-col gap-8'>
        <div className='text-center lg:mx-9'>
          <div className='text-4xl font-bold text-dark-1'>{t('register.createAccount')}</div>
          <div className='mt-4 text-secondary-2'>{t('register.createAccountCaption')}</div>
        </div>

        <button
          //   onClick={registerAction.handleInitGoogleAuth}
          className='relative flex w-full flex-row items-center rounded-lg bg-content p-4 text-center'
        >
          <div className="h-8 w-8 bg-[url('/google-sign-in-icon.png')]" />
          <div className='absolute w-full text-center'>{t('register.signInWithGoogle')}</div>
        </button>

        <div className='text-center font-medium text-secondary-1'>{t('register.or')}</div>

        <div className='flex flex-col gap-6'>
          <DefaultInput name='email' control={control} label='Email Address' errors={errors} />

          <DefaultInput name='password' control={control} label='Password' errors={errors} />

          <DefaultInput name='repeat_password' control={control} label='Repeat Password' errors={errors} />

          <CheckboxField control={control} name='terms_and_conditions' options={options} errors={errors} />

          <div className='flex items-center gap-2'></div>
        </div>
      </div>

      <div className='mt-10 flex w-full justify-center'>
        <div className='flex w-full flex-col items-center gap-4 lg:w-[364px]'>
          <DefaultButton text='Create new account' bg='bg-purple-100' className='w-full h-12 rounded-lg' />
          <div className='flex gap-1'>
            <Typography type='subtitle' color='light'>Already have a companion?</Typography> <Link href='/sign-in' className='text-2sm'>Sign in</Link>
          </div>
        </div>
      </div>
    </UnauthorizedLayout>
  )
}

export default RegisterPage
