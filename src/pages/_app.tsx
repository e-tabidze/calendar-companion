import React, { FC } from 'react'
import { AppProps } from 'next/app'

// ** Global css styles
import '../../styles/globals.css'

// ** Store Imports
import { store } from '../store'
import { Provider } from 'react-redux'

import NextNProgress from 'nextjs-progressbar'

// ** Third Party Import
import { Toaster } from 'react-hot-toast'

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <Provider store={store}>
        <NextNProgress showOnShallow={true} options={{ showSpinner: false }} />

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
