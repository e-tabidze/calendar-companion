import { useRouter } from 'next/router'
import { useState } from 'react'

import Orders from 'src/views/pages/profile/orders'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Favourites from 'src/views/pages/profile/favorites'
import PersonalInfo from 'src/views/pages/profile/personal-information'
import CreateCompany from 'src/views/pages/profile/createCompany'
import CardsAndTransactions from 'src/views/pages/profile/cardsAndTransactions'
import Company from 'src/views/pages/profile/company'
import useProfile from 'src/hooks/useProfile'
import { UserInfo } from 'src/types/User'
import ProfileLayout from 'src/layouts/ProfileLayout'

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
    id: 6,
    icon: '',
    item: 'გასვლა',
    path: '/profile/sign-out'
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

  if (router.query.link?.length) {
    key = router.query?.link[0]
  }

  if (router.query.link?.length == 2) {
    key = 'profile'
  }

  switch (key) {
    case 'profile':
      return <Orders />
    case 'orders':
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
      return <></>
  }
}

const Profile = () => {
  const { width } = useWindowDimensions()
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [selectedRoute, setSelectedRoute] = useState<any>(routes[0])
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)
  const { userInfo, router, isLoading } = useProfile()

  console.log(userInfo, 'userInfo')
  console.log(isLoading, 'isLoading')

  const handleRouteChange = (route: any) => {
    router.push(route.path)
    setSelectedRoute(route)
    width < 1024 && setIsSidebarVisible(!isSidebarVisible)
  }

  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  return (
    <>
      {router.asPath === '/profile/create-company/' ? (
        <CreateCompany />
      ) : (
        <ProfileLayout
          routes={routes}
          sidebarCollapsed={sidebarCollapsed}
          isSidebarVisible={isSidebarVisible}
          handleRouteChange={handleRouteChange}
          selectedRoute={selectedRoute}
          dividerIndexes={[2, 4]}
          toggleSidebarCollapse={toggleSidebarCollapse}
        >
          <ProfileRouter userInfo={userInfo} />
        </ProfileLayout>
      )}
    </>
  )
}

export default Profile
