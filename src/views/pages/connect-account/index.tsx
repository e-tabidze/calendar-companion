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

const ConnectAccountPage = () => {
  const [accountId, setAccountId] = useState('')
  const { userData } = useUserData()
  const { googleCalendarList, postGoogleCalendars } = useConnectGoogleAccount(accountId)
  const [googleConnected, setGoogleConnected] = useState(false)
  const [selectedCalendars, setSelectedCalendars] = useState<any[]>([])
  const [googleCalendars, setGoogleCalendars] = useState<any[]>([])

  const router = useRouter()

  const queryClient = useQueryClient()

  const handleGoogleLogin = () => {
    window.open(
      `${API_URL}/api/auth/connect/google?secret_code=${userData?.information?.secret_code}`,
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
    if (googleCalendarList) {
      const updatedEvents = googleCalendarList.map((item: any) => ({
        ...item,
        is_private: item.primary === true ? false : item.primary === null ? true : false
      }))

      setGoogleCalendars(updatedEvents)

      const primaryEvents = updatedEvents.filter((item: any) => item.primary)

      setSelectedCalendars(prevState => [...prevState, ...primaryEvents])
    }
  }, [googleCalendarList])

  const postCalendarMutation = useMutation(() => postGoogleCalendars('', accountId, selectedCalendars), {
    onSuccess: () => {
      queryClient.invalidateQueries(['userInfo'])

      handleUserRedirection(userData, router)
    },
    onError: (response: any) => {
      if (response.response.status === 400 && response.response.data.result.message === 'User Already Exists') {
        console.log('User Already Exists')
      }
    }
  })

  const handleCalendarClick = (event: any) => {
    setSelectedCalendars(prevState => {
      const index = prevState.findIndex(e => e.id === event.id)
      if (index === -1) {
        return [
          ...prevState,
          {
            ...event,
            account_id: accountId
          }
        ]
      }

      return prevState.filter(e => e.id !== event.id)
    })
  }

  const togglePrivacy = (event: any) => {
    setGoogleCalendars(prevState => prevState.map(e => (e.id === event.id ? { ...e, is_private: !e.is_private } : e)))

    setSelectedCalendars(prevState => prevState.map(e => (e.id === event.id ? { ...e, is_private: !e.is_private } : e)))
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

        <button className={`relative w-full rounded-lg bg-grey-70 p-4 text-center border ${googleConnected ? 'border-green-100' : 'border-grey-70'} `} onClick={handleGoogleLogin}>
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
          <Typography type='subtitle' color='light' className='text-center my-8'>
            By clicking "Connect with Google", you acknowledge that you have read and understood, and agree to{' '}
            <Link href='/terms_and_conditions' className='text-2sm hover:underline text-purple-100'>
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
          {googleCalendars?.map((listItem: any) => (
            <div
              key={listItem.id}
              className={`cursor-pointer p-3 mb-2 rounded-md flex justify-between ${
                selectedCalendars.some(id => id.id === listItem.id)
                  ? 'bg-primary-15 text-primary-100 border border-primary-100'
                  : 'bg-grey-70 text-raisin-80 border-grey-70'
              }`}
              onClick={() => handleCalendarClick(listItem)}
            >
              {listItem?.summary}
              <IconButton
                icon={listItem.is_private ? 'eyeHidden' : 'eye'}
                width={24}
                height={24}
                onClick={(e: any) => {
                  e.stopPropagation()
                  togglePrivacy(listItem)
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <DefaultButton
        text='Ok! Lets jump in'
        bg='bg-primary-100'
        className='w-full h-12 rounded-lg flex-shrink-0'
        type='button'
        onClick={handleSubmit}
        disabled={!googleConnected}
      />
    </UnauthorizedLayout>
  )
}

export default ConnectAccountPage
