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

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
}


const App = (props: ExtendedAppProps) => {
  const { Component, pageProps } = props

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
    </Provider>
  )
}

export default App
