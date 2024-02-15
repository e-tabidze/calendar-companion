import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import useProfile from 'src/hooks/useProfile'
import { UserInfo } from 'src/types/User'
import useCompanyInfo from 'src/hooks/useCompanyInfo'
import { dehydrate, useQueryClient } from '@tanstack/react-query'
import { profileRoutes } from 'src/utils/routes'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { queryClient } from '../_app'

const Orders = dynamic(() => import('src/views/pages/profile/orders'), { ssr: false })
const Favourites = dynamic(() => import('src/views/pages/profile/favourites'), { ssr: false })
const Notifications = dynamic(() => import('src/views/pages/profile/notifications'), { ssr: false })
const PersonalInfo = dynamic(() => import('src/views/pages/profile/personal-information'), { ssr: false })
const CreateCompany = dynamic(() => import('src/views/pages/profile/createCompany'), { ssr: false })
const CardsAndTransactions = dynamic(() => import('src/views/pages/profile/cardsAndTransactions'), { ssr: false })
const Company = dynamic(() => import('src/views/pages/profile/company'), { ssr: false })
const ProfileLayout = dynamic(() => import('src/layouts/ProfileLayout'), { ssr: false })

const ProfileRouter = ({ userInfo }: { userInfo: UserInfo }) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  let key = ''
  let companyid

  if (router.query.slug?.length) {
    key = router.query?.slug[0]
  }

  if (router.query.slug?.length == 2) {
    key = 'profile'
  }

  if (router.query.slug?.includes('company')) {
    companyid = router.query.slug[router.query.slug.length - 1]

    key = `/company/${companyid}/`
  }
  const { companyInfo, isLoading } = useCompanyInfo(Number(companyid))

  if (key.startsWith('/company/')) {
    if (isLoading) {
      return <div>Loading...</div>
    }
    if (companyid) {
      const queryKey = ['companyInfo', companyid]
      queryClient.invalidateQueries(queryKey)
    }

    return companyid && companyInfo ? (
      <Company
        id={Number(companyid)}
        name={companyInfo?.information?.name}
        productsCount={companyInfo?.count_company_poduct}
        logo={companyInfo?.information?.logo}
      />
    ) : (
      <></>
    )
  }

  switch (key) {
    case 'orders' || '':
      return <Orders />
    case 'favourites':
      return <Favourites />
    case 'notifications':
      return <Notifications />
    case 'transactions':
      return <CardsAndTransactions />
    case 'personal-information':
      return userInfo && <PersonalInfo userData={userInfo} />
    case 'create-company':
      return <CreateCompany />
    default:
      return <></>
  }
}

const Profile = () => {
  const { userInfo, router, userCompanies, handleLogout } = useProfile()

  const companyRoutes =
    userCompanies?.map((company: any) => ({
      id: `${company?.information.name}`,
      companyId: company?.id,
      image: company?.information?.logo,
      item: company?.information.name,
      path: `/profile/company/${company?.id}/`
    })) || []

  const allRoutes = [
    ...profileRoutes.filter(route => route.path),
    ...companyRoutes,
    {
      id: 9,
      icon: 'logout',
      item: 'გასვლა',
      onClick: handleLogout
    }
  ]

  return (
    <>
      {router.asPath === '/profile/create-company/' ? (
        <CreateCompany />
      ) : (
        <ProfileLayout routes={allRoutes} dividerIndexes={[2, 5]}>
          <ProfileRouter userInfo={userInfo} />
        </ProfileLayout>
      )}
    </>
  )
}

// const queryClient = new QueryClient()

// export async function getServerSideProps({ locale }: any) {
//   try {
//     await queryClient.prefetchQuery({
//       queryKey: ['userInfo'],
//       queryFn: () => getUserInfo(),
//       staleTime: Infinity
//     })

//     return {
//       props: {
//         ...(await serverSideTranslations(locale, ['common', 'productDetails'])),

//         dehydratedState: dehydrate(queryClient)
//       }
//     }
//   } catch (e) {
//     return { notFound: true }
//   }
// }

export async function getServerSideProps({ locale }: { locale: string }) {
  const [translations] = await Promise.all([serverSideTranslations(locale)])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...translations
    }
  }
}

export default Profile
