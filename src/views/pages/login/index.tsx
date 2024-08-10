import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import useLogin from './useLogin'
import { DefaultInput } from 'src/views/components/input'
import CheckboxField from 'src/views/components/checkboxField'
import Link from 'next/link'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import { AuthUser } from 'src/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import useUserData from 'src/hooks/useUserData'
import Cookie from 'src/helpers/Cookie'
import { ACCESS_TOKEN_NAME, TOKEN_TIME_MINUTES } from 'src/env'
import { handleUserRedirection } from 'src/utils/handleUserRedirection'
import toast from 'react-hot-toast'
import Toast from 'src/views/components/toast'

const LoginPage = () => {
  const { control, errors, handleSubmit, loginValues, signin } = useLogin()

  const queryClient = useQueryClient()

  const { userData } = useUserData()

  const router = useRouter()

  const options = [
    {
      id: 1,
      title: <span className='text-raisin-70'>Remember for 30 days</span>
    }
  ]

  const loginUserMutation = useMutation(
    (user: AuthUser) => {
      return signin(user)
    },
    {
      onSuccess: (response: any) => {
        const date = new Date()
        const minutes = TOKEN_TIME_MINUTES
        const token = response.result.data.bearer
        if (token) {
          date.setTime(date.getTime() + minutes * 60 * 10999)
          Cookie.set(ACCESS_TOKEN_NAME, token, { expires: date, secure: true })
        }

        queryClient.invalidateQueries(['userInfo'])

        handleUserRedirection(userData, router)
      },
      onError: (response: any) => {
        if (response.response.status === 400) {
          toast.custom(<Toast type='error' title={response.response.data.result.message} />)
        }
      }
    }
  )

  const authWithGoogle = () => {
    window.location.href = 'https://api.companyon.ai/api/auth/login/google'

    console.log(Cookie.get('AccessToken'), 'Cookie.get')
    queryClient.invalidateQueries(['userInfo'])

    handleUserRedirection(userData, router)
  }

  const onSubmit = () => {
    loginUserMutation.mutate(loginValues)
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

          <button className='relative w-full rounded-lg bg-grey-70 p-4 text-center' onClick={authWithGoogle}>
            <div className="h-8 w-8 absolute top-3 bg-[url('/images/google-sign-in-icon.png')]" />
            Sign in with Google
          </button>

          <Typography type='subtitle' color='light'>
            or
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex-1 shrink-0 flex flex-col justify-between'>
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
              <DefaultButton text='Sign in' bg='bg-primary-100' className='w-full h-12 rounded-lg' type='submit' />
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
