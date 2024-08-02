import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'


const authHOC = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const Wrapper: React.FC<P> = props => {
    const router = useRouter()
    const accessToken = Cookies.get('accessToken')

    useEffect(() => {
      if (!accessToken) {
        router.replace('/login')
      }
    }, [accessToken, router])

    if (!accessToken) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default authHOC
