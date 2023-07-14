import React from 'react'
import Head from 'next/head'

const PageMeta = () => {
  return (
    <Head>
      <title>Rent MyAuto</title>
      <meta property='og:title' content='Rent MyAuto' key='title' />
      <meta name='description' content='Rent MyAuto description content.' />
    </Head>
  )
}

export default PageMeta
