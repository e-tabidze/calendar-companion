import { useState } from 'react'
import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import CompanyDashboard from 'src/views/pages/dashboard/companyDasboard'
import IncomingOrders from 'src/views/pages/dashboard/incomingOrders'
import Vehicles from 'src/views/pages/dashboard/vehicles'
import EditCompany from 'src/views/pages/dashboard/editCompany'
import NewListing from 'src/views/pages/dashboard/newListing'
import { isMobile } from 'react-device-detect'
import ProfileLayout from 'src/layouts/ProfileLayout'

const routes = [
  {
    id: 1,
    icon: '/icons/orders.svg',
    item: 'დეშბორდი',
    path: '/dashboard/dashboard'
  },
  {
    id: 2,
    icon: '',
    item: 'განცხადების დამატება',
    path: '/dashboard/new-listing'
  },
  {
    id: 3,
    icon: '',
    item: 'შემოსული ჯავშნები',
    path: '/dashboard/orders'
  },
  {
    id: 4,
    icon: '',
    item: 'გადახდები',
    path: '/dashboard/payments'
  },
  {
    id: 5,
    icon: '',
    item: 'ავტომობილები',
    path: '/dashboard/vehicles'
  },
  {
    id: 6,
    icon: '',
    item: 'კომპანიის რედაქტირება',
    path: '/dashboard/edit-company'
  },
  {
    id: 7,
    icon: '',
    item: 'გასვლა',
    path: '/dashboard/sign-out'
  }
]

const ProfileRouter = () => {
  const router = useRouter()
  let key = ''

  if (router.query.link?.length) {
    key = router.query?.link[0]
  }

  if (router.query.link?.length == 2) {
    key = 'profile'
  }

  switch (key) {
    case 'dashboard':
      return <CompanyDashboard />
    case 'new-listing':
      return <NewListing />
    case 'orders':
      return <IncomingOrders />
    case 'payments':
      return <div>Payments</div>
    case 'vehicles':
      return <Vehicles />
    case 'edit-company':
      return <EditCompany />
    case 'sign-out':
      return <div>Sign Out</div>
    default:
      return <></>
  }
}

const Profile = () => {
  const { width } = useWindowDimensions()
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [selectedRoute, setSelectedRoute] = useState<any>(routes[0])
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)

  const router = useRouter()

  const handleRouteChange = (route: any) => {
    router.push(route.path)
    setSelectedRoute(route)
    width < 1024 && setIsSidebarVisible(!isSidebarVisible)
  }

  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  return (
    <>
      {router.asPath === '/dashboard/new-listing/' ? (
        <NewListing />
      ) : (
        <ProfileLayout
          routes={routes}
          sidebarCollapsed={sidebarCollapsed}
          isSidebarVisible={isSidebarVisible}
          handleRouteChange={handleRouteChange}
          selectedRoute={selectedRoute}
          dividerIndexes={[5]}
          toggleSidebarCollapse={toggleSidebarCollapse}
        >
          <ProfileRouter />
        </ProfileLayout>
      )}
    </>
  )
}

export default Profile
