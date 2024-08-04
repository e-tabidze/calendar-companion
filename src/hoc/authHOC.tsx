import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

const authHOC = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
      const accessToken = Cookies.get('AccessToken')
      if (!accessToken) {
        router.replace('/login')
      } else {
        setIsAuthenticated(true)
      }
    }, [router])

    if (!isAuthenticated) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default authHOC
