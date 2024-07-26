import React from 'react'
import Head from 'next/head'

import { Meta } from '../../interfaces'

type Props = {
  meta: Meta
}

const PageMeta = ({
  meta = {
    title: '',
    desc: ''
  }
}: Props) => {
  return (
    <Head>
      <title>{meta.title}</title>
      <meta property='og:title' content={meta.title} key='title' />
      <meta name='description' content={meta.desc} />
      <meta name='image' content={meta.img} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0' />
      <meta name='facebook-domain-verification' content='jmj5j9uzm6vk7gxj981j3sy94q793b' />
    </Head>
  )
}

export default PageMeta
