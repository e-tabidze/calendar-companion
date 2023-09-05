import React, { FC } from 'react'
import { AppProps } from 'next/app'
import type { NextPage } from 'next'

// ** Global css styles
import '../../styles/globals.css'

// ** Store Imports
import { store } from '../store'
import { Provider } from 'react-redux'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
}

const App: FC<AppProps> = ({ Component, pageProps, ...rest }) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
      <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
    </>
  )
}

export default App
