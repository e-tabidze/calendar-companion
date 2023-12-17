import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import useProfile, { getUserInfo } from 'src/hooks/useProfile'
import { UserInfo } from 'src/types/User'
import { dehydrate } from '@tanstack/query-core'
import useCompanyInfo from 'src/hooks/useCompanyInfo'
import { QueryClient, useQueryClient } from '@tanstack/react-query'
import { profileRoutes } from 'src/utils/routes'

const Orders = dynamic(() => import('src/views/pages/profile/orders'), { ssr: true })
const Favourites = dynamic(() => import('src/views/pages/profile/favourites'), { ssr: true })
const Notifications = dynamic(() => import('src/views/pages/profile/notifications'), { ssr: true })
const PersonalInfo = dynamic(() => import('src/views/pages/profile/personal-information'), { ssr: true })
const CreateCompany = dynamic(() => import('src/views/pages/profile/createCompany'), { ssr: true })
const CardsAndTransactions = dynamic(() => import('src/views/pages/profile/cardsAndTransactions'), { ssr: true })
const Company = dynamic(() => import('src/views/pages/profile/company'), { ssr: true })
const ProfileLayout = dynamic(() => import('src/layouts/ProfileLayout'), { ssr: true })

const ProfileRouter = ({ userInfo }: { userInfo: UserInfo }) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  let key = ''
  let companyid

  if (router.query.link?.length) {
    key = router.query?.link[0]
  }

  if (router.query.link?.length == 2) {
    key = 'profile'
  }

  if (router.query.link?.includes('company')) {
    companyid = router.query.link[router.query.link.length - 1]

    key = `/company/${companyid}`
  }
  const { companyInfo, isLoading } = useCompanyInfo(Number(companyid))

  console.log(companyInfo, 'companyInfo')

  if (key.startsWith('/company/')) {
    if (isLoading) {
      return <div>Loading...</div>
    }
    if (companyid) {
      const queryKey = ['companyInfo', companyid]
      queryClient.invalidateQueries(queryKey)
    }

    console.log(router, 'router')

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
      id: company?.id,
      companyId: company?.id,
      image: company?.information?.logo,
      item: company?.information.name,
      path: `/profile/company/${company?.id}`
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

const queryClient = new QueryClient()

export async function getServerSideProps() {
  try {
    await queryClient.prefetchQuery({
      queryKey: ['userInfo'],
      queryFn: () => getUserInfo(),
      staleTime: Infinity
    })

    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    }
  } catch (e) {
    return { notFound: true }
  }
}

export default Profile
