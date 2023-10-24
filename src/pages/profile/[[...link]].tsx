import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import useProfile, { getUserInfo } from 'src/hooks/useProfile'
import { UserInfo } from 'src/types/User'
import { dehydrate, QueryClient } from '@tanstack/query-core'
import useCompanyInfo from 'src/views/pages/profile/company/useCompanyInfo'

const Orders = dynamic(() => import('src/views/pages/profile/orders'), { ssr: true })
const Favourites = dynamic(() => import('src/views/pages/profile/favorites'), { ssr: true })
const PersonalInfo = dynamic(() => import('src/views/pages/profile/personal-information'), { ssr: true })
const CreateCompany = dynamic(() => import('src/views/pages/profile/createCompany'), { ssr: true })
const CardsAndTransactions = dynamic(() => import('src/views/pages/profile/cardsAndTransactions'), { ssr: true })
const Company = dynamic(() => import('src/views/pages/profile/company'), { ssr: true })
const ProfileLayout = dynamic(() => import('src/layouts/ProfileLayout'), { ssr: true })

const routes = [
  {
    id: 1,
    icon: '/icons/orders.svg',
    item: 'ჩემი შეკვეთები',
    path: '/profile/orders'
  },
  {
    id: 2,
    icon: '',
    item: 'ფავორიტები',
    path: '/profile/favourites'
  },
  {
    id: 3,
    icon: '',
    item: 'ბარათები და ტრანზაქციები',
    path: '/profile/transactions'
  },
  {
    id: 4,
    icon: '',
    item: 'პარამეტრები',
    path: '/profile/personal-information'
  },
  {
    id: 5,
    icon: '',
    item: 'კომპანიის შექმნა',
    path: '/profile/create-company'
  },
  {
    id: 7,
    icon: '',
    item: 'ბედინა',
    path: '/profile/company/bedina-plus'
  }
]

const ProfileRouter = ({ userInfo }: { userInfo: UserInfo }) => {
  const router = useRouter()
  let key = ''
  let companyid

  if (router.query.link?.length) {
    key = router.query?.link[0]
  }

  if (router.query.link?.length == 2) {
    key = 'profile'
  }

  if (router.query.link.includes('company')) {
    companyid = router.query.link[router.query.link.length - 1]

    key = `/company/${companyid}`
  }
  const { companyInfo, isLoading } = useCompanyInfo(Number(companyid))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (key.startsWith('/company/')) {
    if (companyid) {
      const queryKey = ['companyInfo', companyid]
      queryClient.invalidateQueries(queryKey)
    }

    return companyid && companyInfo ? <Company id={Number(companyid)} /> : <></>
  }

  switch (key) {
    case 'orders' || '':
      return <Orders />
    case 'favourites':
      return <Favourites />
    case 'transactions':
      return <CardsAndTransactions />
    case 'personal-information':
      return userInfo && <PersonalInfo userData={userInfo} />
    case 'create-company':
      return <CreateCompany />
    case 'create-company':
      return <CreateCompany />
    default:
      return <></>
  }
}

const Profile = () => {
  const { userInfo, router } = useProfile()

  const companyRoutes =
    userInfo?.companies?.map((company: any) => ({
      id: 8 + company?.id,
      icon: '',
      item: company?.information.name,
      path: `/profile/company/${company?.id}`
    })) || []

  const allRoutes = [
    ...routes,
    ...companyRoutes,
    {
      id: 9,
      icon: '',
      item: 'გასვლა',
      path: '/profile/sign-out'
    }
  ]

  return (
    <>
      {router.asPath === '/profile/create-company/' ? (
        <CreateCompany />
      ) : (
        <ProfileLayout routes={allRoutes} dividerIndexes={[2, 4]}>
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
