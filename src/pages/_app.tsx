import React, { FC } from 'react'
import { AppProps } from 'next/app'
import type { NextPage } from 'next'

// ** Global css styles
import '../../styles/globals.css'

// ** Store Imports
import { wrapper } from '../store'
import { Provider } from 'react-redux'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from 'src/@core/context/AuthContext'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
}

const App: FC<AppProps> = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
      <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
    </>
  )
}

export default App
