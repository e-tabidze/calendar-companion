import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useUserData from 'src/hooks/useUserData'
import Cookie from 'src/helpers/Cookie'

const authHOC = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const Wrapper: React.FC<P> = props => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { userData, isLoading } = useUserData()

    useEffect(() => {
      const accessToken = Cookie.get('AccessToken')
      if (!accessToken) {
        router.replace('/login')
      } else {
        setIsAuthenticated(true)
      }
    }, [])

    useEffect(() => {
      if (userData) {
        if (userData.active_profile === null) {
          router.replace('/workspace')
        } else if (userData.account_connection.length === 0 || userData.active_profile.calendars.length === 0) {
          router.replace('/connect-account')
        } else {
          router.replace('/calendar')
        }
      }
    }, [userData, isAuthenticated, isLoading])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default authHOC
