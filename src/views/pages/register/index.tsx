import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import useRegister from './useRegister'
import { DefaultInput } from 'src/views/components/input'
import CheckboxField from 'src/views/components/checkboxField'
import Link from 'next/link'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import { useMutation } from '@tanstack/react-query'
import { AuthUser } from 'src/types/auth'
import { useRouter } from 'next/router'
import useUserData from 'src/hooks/useUserData'
import { queryClient } from 'src/pages/_app'
import { handleUserRedirection } from 'src/utils/handleUserRedirection'
import toast from 'react-hot-toast'
import Toast from 'src/views/components/toast'

const RegisterPage = () => {
  const { control, errors, handleSubmit, registerValues, registerUser, trigger } = useRegister()

  const { userData } = useUserData()

  const router = useRouter()

  const options = [
    {
      id: 1,
      title: (
        <>
          By clicking “Create account” you automatically agree to our
          <Link href='/rules' target='_blank' className='ml-2 text-orange-100'>
            Terms of Service and Privacy Policy
          </Link>
        </>
      )
    }
  ]

  const registerUserMutation = useMutation(
    (user: AuthUser) => {
      return registerUser('', user)
    },
    {
      onSuccess: (response: any) => {
        router.push(`verify?email=${response.result.data.username}`)
      },
      onError: (response: any) => {
        if (response.response.status === 400 && response.response.data.result.message === 'User Already Exists') {
          toast.custom(<Toast type='error' title='User with this email already exists' />)
        }
      }
    }
  )

  const onSubmit = () => {
    registerUserMutation.mutate(registerValues)
  }

  const authWithGoogle = () => {
    window.location.href = 'https://api.companyon.ai/api/auth/login/google'
    queryClient.invalidateQueries(['userInfo'])

    handleUserRedirection(userData, router)
  }

  return (
    <UnauthorizedLayout>
      <div className='h-full flex flex-col'>
        <div className='flex flex-col items-center gap-8 pb-8'>
          <div className='text-center lg:mx-9'>
            <Typography type='h1'>Create new account</Typography>
            <Typography type='h5' color='light'>
              Unlock the full potential of your meetings with Companion AI.
            </Typography>
          </div>

          <button className='relative w-full rounded-lg bg-grey-70 p-4 text-center' onClick={authWithGoogle}>
            <div className="h-8 w-8 absolute top-3 bg-[url('/images/google-sign-in-icon.png')]" />
            Sign up with Google
          </button>

          <Typography type='subtitle' color='light'>
            or
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='flex-1 shrink-0 flex flex-col justify-between'>
          <div className='flex flex-col gap-6'>
            <DefaultInput name='username' control={control} label='Email Address' errors={errors} />

            <DefaultInput name='password' type='password' control={control} label='Password' errors={errors} onBlur={() => trigger('password')} />

            <DefaultInput
              name='repeat_password'
              type='password'
              control={control}
              label='Repeat Password'
              errors={errors}
            />

            <CheckboxField control={control} name='terms_and_conditions' options={options} errors={errors} />

            <div className='flex items-center gap-2'></div>
          </div>

          <div className='mt-10 flex w-full justify-center'>
            <div className='flex w-full flex-col items-center gap-4 lg:w-[364px]'>
              <DefaultButton
                text='Create new account'
                bg='bg-primary-100'
                className='w-full h-12 rounded-lg'
                type='submit'
              />
              <div className='flex gap-1 text-raisin-80'>
                <Typography type='subtitle' color='light'>
                  Already have a companion?
                </Typography>{' '}
                <Link href='/login' className='text-2sm text-primary-100 hover:underline'>
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </UnauthorizedLayout>
  )
}

export default RegisterPage
