// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, User } from 'src/types/AuthContext'

// ** Services
import AuthService from 'src/services/AuthService'
import UserService from 'src/services/UserService'

// ** Cookies
import Cookie from 'src/helpers/Cookie'
import { ACCESS_TOKEN_NAME } from 'src/env'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<User | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = Cookie.get(ACCESS_TOKEN_NAME)

      if (storedToken) {
        setLoading(false)
        try {
          const response: any = await UserService.getUserData()
          console.log(response, 'response')
          setLoading(false)
          setUser({ ...response.data })
        } catch (error) {
          Cookie.remove(ACCESS_TOKEN_NAME)
          setUser(null)
          setLoading(false)
        }
      } else {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const handleLogin = async (params: LoginParams, errorCallback?: ErrCallbackType) => {
    try {
      const response: any = await AuthService.signIn(params)
      AuthService.setToken(response.data.result.access_token)

      const returnUrl = router.query.returnUrl

      setUser({ ...response.data.result })
      await window.localStorage.setItem('userData', JSON.stringify(response.data.result))

      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

      router.replace(redirectURL as string)
    } catch (err: any) {
      if (errorCallback) errorCallback(err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    Cookie.remove(ACCESS_TOKEN_NAME)
    router.push('/')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
