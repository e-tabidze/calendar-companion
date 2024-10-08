import React, { FC } from 'react'
import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import '../../styles/globals.css'
import '../../styles/global.scss'

import NextNProgress from 'nextjs-progressbar'

import { Toaster } from 'react-hot-toast'

import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient()

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <NextNProgress showOnShallow={true} options={{ showSpinner: false }} color='#549684' />

      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
      <Toaster position={'top-right'} toastOptions={{ className: 'react-hot-toast' }} />
    </>
  )
}

export default appWithTranslation(App)
