import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useUserData from 'src/hooks/useUserData'
import Cookie from 'src/helpers/Cookie'
import { handleUserRedirection } from 'src/utils/handleUserRedirection'

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
      handleUserRedirection(userData, router)
    }, [userData, isAuthenticated, isLoading])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default authHOC
