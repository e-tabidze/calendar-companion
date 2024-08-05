import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import useLogin from './useLogin'
import { DefaultInput } from 'src/views/components/input'
import CheckboxField from 'src/views/components/checkboxField'
import Link from 'next/link'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import { AuthUser } from 'src/types/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import useUserData from 'src/hooks/useUserData'
import Cookie from 'src/helpers/Cookie'
import { ACCESS_TOKEN_NAME, TOKEN_TIME_MINUTES } from 'src/env'

const LoginPage = () => {
  const { control, errors, handleSubmit, loginValues, signin } = useLogin()

  const { userData } = useUserData()

  const router = useRouter()

  const options = [
    {
      id: 1,
      title: <span className='text-raisin-70'>Remember for 30 days</span>
    }
  ]

  const registerUserMutation = useMutation(
    (user: AuthUser) => {
      return signin(user)
    },
    {
      onSuccess: (response: any) => {
        console.log(response, 'response')
        const date = new Date()
        const minutes = TOKEN_TIME_MINUTES
        const token = response.result.data.bearer
        if (token) {
          date.setTime(date.getTime() + minutes * 60 * 10999)
          Cookie.set(ACCESS_TOKEN_NAME, token, { expires: date, secure: true })
        }

        if (userData) {
          if (userData.active_profile === null) {
            router.push('/workspace')
          } else if (userData?.account_connection.length === 0 || userData?.active_profile?.calendars?.length === 0) {
            router.push('/connect-account')
          } else {
            router.push('/calendar')
          }
        }
      },
      onError: (response: any) => {
        if (response.response.status === 400 && response.response.data.result.message === 'Incorrect Credentials') {
          console.log('Incorrect Credentials')
        }
      }
    }
  )

  const onSubmit = () => {
    registerUserMutation.mutate(loginValues)
  }

  const onError = (errors: any) => {
    console.log('Errors:', errors)
  }

  return (
    <UnauthorizedLayout>
      <div className='h-full flex flex-col'>
        <div className='flex flex-col items-center gap-8 pb-8'>
          <div className='text-center lg:mx-9'>
            <Typography type='h1'>Hello again!</Typography>
            <Typography type='h5' color='light'>
              Welcome back! Companion Ai is here to help you manage your calendar, schedule meetings, get detailed
              information, and collaborate with your team
            </Typography>
          </div>

          <button className='relative w-full rounded-lg bg-grey-70 p-4 text-center'>
            <div className="h-8 w-8 absolute top-3 bg-[url('/images/google-sign-in-icon.png')]" />
            Sign in with Google
          </button>

          <Typography type='subtitle' color='light'>
            or
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit, onError)} className='flex-1 shrink-0 flex flex-col justify-between'>
          <div className='flex flex-col gap-6'>
            <DefaultInput name='username' control={control} label='Email Address' errors={errors} />

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
              <DefaultButton text='Sign in' bg='bg-purple-100' className='w-full h-12 rounded-lg' type='submit' />
              <div className='flex gap-1'>
                <Typography type='subtitle' color='light'>
                  New to Companion AI?
                </Typography>{' '}
                <Link href='/register' className='text-2sm hover:underline'>
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </UnauthorizedLayout>
  )
}

export default LoginPage
