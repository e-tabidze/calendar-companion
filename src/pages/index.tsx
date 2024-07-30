import { dehydrate } from '@tanstack/react-query'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { queryClient } from './_app'

const MainPage = () => {
  return <div>Index Page</div>
}

export default MainPage

export async function getServerSideProps({ locale }: { locale: string }) {
  const [translations] = await Promise.all([serverSideTranslations(locale)])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...translations
    }
  }
}
