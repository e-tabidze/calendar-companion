import UnauthorizedLayout from 'src/layouts/UnauthorizedLayout'
import ProgressBar from '../getting-started/progressBar'
import { DefaultButton, IconButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import Link from 'next/link'
import Icon from 'src/views/app/Icon'
import { API_URL } from 'src/env'
import useUserData from 'src/hooks/useUserData'
import { useEffect, useState } from 'react'
import useConnectGoogleAccount from './useConnectGoogleAccount'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { handleUserRedirection } from 'src/utils/handleUserRedirection'
import toast from 'react-hot-toast'
import Toast from 'src/views/components/toast'

const ConnectAccountPage = () => {
  const [accountId, setAccountId] = useState('')
  const { userData } = useUserData()
  const { refetchGoogleCalendarList, googleCalendarList, postGoogleCalendars } = useConnectGoogleAccount(accountId)
  const [googleConnected, setGoogleConnected] = useState(false)
  const [selectedEvents, setSelectedEvents] = useState<any[]>([])

  const router = useRouter()

  const queryClient = useQueryClient()

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

    if (status === '1' && account_id) {
      setAccountId(account_id)

      const result = await refetchGoogleCalendarList()

      console.log(result, 'result')

      if (result.status === 'success') {
        setGoogleConnected(true)
      } else if (result.status === 'error') {
        toast.custom(<Toast type='error' title='Error detected' />)
      }
    }
  }

  // useEffect(() => {
  //   if (accountId) {
  //     refetchGoogleCalendarList()
  //   }
  // }, [accountId, refetchGoogleCalendarList])

  const postCalendarMutation = useMutation(() => postGoogleCalendars('', accountId, selectedEvents), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo'])

      handleUserRedirection(userData, router)

      // router.push(`/calendar`)
    },
    onError: (response: any) => {
      if (response.response.status === 400 && response.response.data.result.message === 'User Already Exists') {
        console.log('User Already Exists')
      }
    }
  })

  const handleCalendarClick = (event: any) => {
    setSelectedEvents(prevState => {
      const index = prevState.findIndex(e => e.id === event.id)
      if (index === -1) {
        return [
          ...prevState,
          {
            ...event,
            account_id: accountId,
            is_private: false
          }
        ]
      }

      return prevState.filter(e => e.id !== event.id)
    })
  }

  const togglePrivacy = (event: any) => {
    setSelectedEvents(prevState => prevState.map(e => (e.id === event.id ? { ...e, is_private: !e.is_private } : e)))
  }

  const handleSubmit = () => {
    postCalendarMutation.mutate()
  }

  return (
    <UnauthorizedLayout>
      <div className='h-full flex flex-col'>
        <ProgressBar currentStep={4} totalSteps={5} />
        <div className='flex flex-col items-center gap-8 pb-8 mt-16'>
          <div className='text-center lg:mx-9'>
            <Typography type='h1'>Connect your platforms</Typography>
            <Typography type='h5' color='light'>
              Connecting your Google account will let you view your calendar, schedule meetings, collaborate with your
              team members and use our bot.
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

        <div className='flex flex-col text-center gap-1'>
          <Typography type='subtitle' color='light' className='text-center mt-8'>
            By clicking "Connect with Google", you acknowledge that you have read and understood, and agree to{' '}
            <Link href='/terms_and_conditions' className='text-2sm hover:underline text-primary-100'>
              Companion AI's Terms & Conditions and Privacy Policy
            </Link>
          </Typography>
          {googleConnected && (
            <Typography type='subtitle' weight='medium'>
              Select calendars to import
            </Typography>
          )}
        </div>

        <div className='max-h-[200px] overflow-auto mt-12'>
          {googleCalendarList?.map((listItem: any) => (
            <>
              {console.log(listItem, 'listItem')}

              <div
                key={listItem.id}
                className={`cursor-pointer p-3 mb-2 rounded-md flex justify-between ${
                  selectedEvents.some(id => id.id === listItem.id)
                    ? 'bg-primary-10 text-primary-100'
                    : 'bg-grey-70 text-raisin-80'
                }`}
                onClick={() => handleCalendarClick(listItem)}
              >
                {listItem?.summary}
                <IconButton
                  icon={selectedEvents.find(e => e.id === listItem.id)?.is_private ? 'padlock' : 'padlockOpen'}
                  width={24}
                  height={24}
                  onClick={(e: any) => {
                    e.stopPropagation()
                    togglePrivacy(listItem)
                  }}
                />
              </div>
            </>
          ))}
        </div>
      </div>
      <DefaultButton
        text='Ok! Lets jump in'
        bg='bg-primary-100'
        className='w-full h-12 rounded-lg'
        type='button'
        onClick={handleSubmit}
        disabled={!googleConnected}
      />
    </UnauthorizedLayout>
  )
}

export default ConnectAccountPage
