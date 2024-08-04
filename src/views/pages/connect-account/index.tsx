import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import ProgressBar from '../getting-started/progressBar'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import Link from 'next/link'
import Icon from 'src/views/app/Icon'
import { API_URL } from 'src/env'
import useUserData from 'src/hooks/useUserData'
import { useEffect, useState } from 'react'
import useConnectGoogleAccount from './useConnectGoogleAccount'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const ConnectAccountPage = () => {
  const [accountId, setAccountId] = useState(null)
  const { userData } = useUserData()
  const { refetchGoogleCalendarList, googleCalendarList, postGoogleCalendars } = useConnectGoogleAccount(accountId)
  const [googleConnected, setGoogleConnected] = useState(false)

  const router = useRouter()

  const handleGoogleLogin = () => {
    window.open(
      `${API_URL}/auth/connect/google?secret_code=${userData.information.secret_code}`,
      'GoogleOAuth',
      'width=600,height=700'
    )

    window.addEventListener('message', handleOAuthMessage, false)
  }

  const handleOAuthMessage = async (event: any) => {
    if (event.origin !== `https://api.companyon.ai`) {
      return
    }

    const { status, account_id } = event.data

    if (status === '1') {
      setGoogleConnected(true)
      setAccountId(account_id)
    }
  }

  useEffect(() => {
    if (accountId) {
      refetchGoogleCalendarList()
    }
  }, [accountId, refetchGoogleCalendarList])

  const postCalendarMutation = useMutation(
    calendar => {
      return postGoogleCalendars('', calendar)
    },
    {
      onSuccess: (response: any) => {
        console.log(response, 'response')
      },
      onError: (response: any) => {
        console.log(response)
      }
    }
  )

  const handleCalendarClick = (calendarEvent: any) => {
    postCalendarMutation.mutate({
      ...calendarEvent,
      account_id: accountId,
      is_private: false
    })
  }

  const redirectToCalendar = () => {
    router.push('/calendar')
  }

  return (
    <UnauthorizedLayout>
      <div className='h-full flex flex-col'>
        <ProgressBar currentStep={4} totalSteps={5} />
        <div className='flex flex-col items-center gap-8 pb-8 mt-16'>
          <div className='text-center lg:mx-9'>
            <Typography type='h1'>Connect your platforms</Typography>
            <Typography type='h5' color='light'>
              Connecting your Google account will let you to view your calendar, schedule meetings, collaborate with
              your team members and use our bot
            </Typography>
          </div>
        </div>

        <button className='relative w-full rounded-lg bg-grey-70 p-4 text-center' onClick={handleGoogleLogin}>
          <div className="h-8 w-8 absolute top-3 bg-[url('/images/google-meet.png')]" />
          {googleConnected ? 'Google Account is Connected' : 'Connect with Google'}
          <Icon
            svgPath='connect'
            width={24}
            height={24}
            color={googleConnected ? '#549684' : '#575E75'}
            className='absolute right-3 top-4'
          />
        </button>

        <div className='flex gap-1'>
          <Typography type='subtitle' color='light' className='text-center mt-8'>
            By clicking "Connect with Google", you acknowledge that you have read and understood, and agree to{' '}
            <Link href='/terms_and_conditions' className='text-2sm hover:underline text-purple-100'>
              Companion AI's Terms & Conditions and Privacy Policy
            </Link>
          </Typography>
        </div>
        {googleCalendarList?.map((listItem: any) => (
          <div
            key={listItem.id}
            onClick={() => handleCalendarClick(listItem)}
            className='cursor-pointer p-2 border-b border-gray-300'
          >
            {listItem?.summary}
          </div>
        ))}
      </div>
      <DefaultButton
        text='Ok! Lets jump in'
        bg='bg-purple-100'
        className='w-full h-12 rounded-lg'
        type='button'
        onClick={redirectToCalendar}
      />
    </UnauthorizedLayout>
  )
}

export default ConnectAccountPage
