import { useRouter } from 'next/router'
import Orders from 'src/views/pages/profile/orders'
import Favourites from 'src/views/pages/profile/favorites'
import PersonalInfo from 'src/views/pages/profile/personal-information'
import CreateCompany from 'src/views/pages/profile/createCompany'
import CardsAndTransactions from 'src/views/pages/profile/cardsAndTransactions'
import Company from 'src/views/pages/profile/company'
import useProfile, { getUserInfo } from 'src/hooks/useProfile'
import { UserInfo } from 'src/types/User'
import ProfileLayout from 'src/layouts/ProfileLayout'
import { dehydrate, QueryClient } from '@tanstack/query-core'

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
    path: '/profile/bedina-plus'
  }
]

const ProfileRouter = ({ userInfo }: { userInfo: UserInfo }) => {
  const router = useRouter()
  let key = ''

  console.log(router, 'router')

  if (router.query.link?.length) {
    console.log(router.query, '<= query')
    key = router.query?.link[0]
  }

  // if (router.query.link?.length == 2) {
  //   key = 'profile'
  // }

  // if (key.startsWith('company/')) {
  //   const companyName = key.split('/')[1]
  //   return <CompanyPage />
  // }

  console.log(key, '<= key')

  switch (key) {
    case 'orders' || '':
      return <Orders />
    case 'favourites':
      return <Favourites />
    case 'transactions':
      return <CardsAndTransactions />
    case 'personal-information':
      return userInfo && <PersonalInfo userData={userInfo} />
    case 'bedina-plus':
      return <Company />
    case 'create-company':
      return <CreateCompany />
    default:
      return <Orders />
  }
}

const Profile = () => {
  const { userInfo, router } = useProfile()

  const companyRoutes =
    userInfo?.companies?.map((company: any, index: number) => ({
      id: 8 + company?.id,
      icon: '',
      item: company?.information.name,
      path: `/profile/company/${company?.information?.name?.replace(' ', '-')}`
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
