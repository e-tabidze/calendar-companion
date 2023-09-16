import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from 'src/layouts/DefaultLayout'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Image from 'next/image'
import CompanyDashboard from 'src/views/pages/dashboard/companyDasboard'
import IncomingOrders from 'src/views/pages/dashboard/incomingOrders'
import Vehicles from 'src/views/pages/dashboard/vehicles'
import EditCompany from 'src/views/pages/dashboard/editCompany'
import NewListing from 'src/views/pages/dashboard/newListing'

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
  const [dividerIndexes] = useState([5])
  const [component, setComponent] = useState<any>(<div>Dashboard</div>)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [selectedRoute, setSelectedRoute] = useState<any>(routes[0])
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)

  const router = useRouter()

  const sidebarClassName = `h-fit w-full mx-4 lg:mx-4 lg:w-fit border border-raisin-10 rounded-3xl p-6 ${
    isSidebarVisible ? 'block' : 'hidden'
  } lg:block`

  const contentClassName = `w-full z-[111] ${isSidebarVisible ? 'hidden' : 'block'} lg:block`

  const getComponentByPath = (path: any) => {
    switch (path) {
      case '/dashboard/dashboard/':
        return <CompanyDashboard />
      case '/dashboard/new-listing/':
        return <NewListing />
      case '/dashboard/orders/':
        return <IncomingOrders />
      case '/dashboard/payments/':
        return <div>Payments</div>
      case '/dashboard/vehicles/':
        return <Vehicles />
      case '/dashboard/edit-company/':
        return <EditCompany />
      case '/dashboard/sign-out/':
        return <div>Sign Out</div>
      default:
        return component
    }
  }

  const handleRouteChange = (route: any) => {
    router.push(route.path)
    setSelectedRoute(route)
    width < 1024 && setIsSidebarVisible(!isSidebarVisible)
  }
  useEffect(() => {
    const currentComponent = getComponentByPath(router.asPath)
    setComponent(currentComponent)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  return (
    <>
      {' '}
      {router.asPath === '/dashboard/new-listing/' ? (
        <NewListing />
      ) : (
        <DefaultLayout>
          <div className='w-full m-auto max-w-[1200px] lg:px-8 2xl:px-0'>
            <div className='flex gap-none lg:gap-4 mt-9'>
              <div className={sidebarClassName}>
                <div
                  className={`flex items-center justify-between mb-4 gap-4 w-full ${
                    sidebarCollapsed ? 'flex-col' : 'flex-row'
                  } `}
                >
                  <div className='flex items-center gap-5'>
                    <Image src='/images/avatar.png' alt='' className='rounded-full' width={48} height={48} />
                    <Typography type='h5' weight='medium' className={`${sidebarCollapsed ? 'hidden' : 'inline-block'}`}>
                      ბენე ექსკლუზივი
                    </Typography>
                  </div>
                  <div
                    className='w-6 h-6 rounded-full bg-raisin-10 flex justify-center items-center'
                    onClick={toggleSidebarCollapse}
                  >
                    <Image
                      src='/icons/chevron.svg'
                      alt=''
                      width={9}
                      height={8}
                      className={`cursor-pointer ${sidebarCollapsed ? 'transform -rotate-90' : 'transform rotate-90'} `}
                    />
                  </div>
                </div>
                <Divider />
                <div className='w-max'>
                  {routes.map((route, index) => (
                    <div key={route.id} onClick={() => handleRouteChange(route)}>
                      <div className='flex items-center gap-8 my-4 cursor-pointer'>
                        <div className={`h-8 w-8 rounded-lg bg-raisin-10`}>
                          <Image src={route.icon} alt='' width={3} height={3} />
                        </div>
                        {!sidebarCollapsed && (
                          <Typography
                            type='h5'
                            className={`${
                              selectedRoute.path.split('/')[2] === route.path.split('/')[2] ? 'text-orange-100' : ''
                            }'`}
                          >
                            {route.item}
                          </Typography>
                        )}
                      </div>
                      {dividerIndexes.includes(index) && <Divider />}
                    </div>
                  ))}
                </div>
              </div>
              <div></div>
              {/* {width < 1024 && isSidebarVisible ? <></> : <div className={contentClassName}>{component}</div>} */}
              <ProfileRouter />
            </div>
          </div>
        </DefaultLayout>
      )}
    </>
  )
}

export default Profile
