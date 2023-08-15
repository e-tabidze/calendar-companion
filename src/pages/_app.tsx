import React from 'react'
import { AppProps } from 'next/app'
import type { NextPage } from 'next'

// ** Global css styles
import '../../styles/globals.css'

// ** Store Imports
import { store } from '../store'
import { Provider } from 'react-redux'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from 'src/@core/context/AuthContext'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
}

const App = (props: ExtendedAppProps) => {
  const { Component, pageProps } = props

  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
        <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
      </AuthProvider>
    </Provider>
  )
}

export default App
