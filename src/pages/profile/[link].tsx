import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { SmallerContainer } from 'src/styled/styles'
import Breadcrumb from 'src/views/components/breadcrumb'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import Orders from 'src/views/pages/profile/orders'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Image from 'next/image'
import Favourites from 'src/views/pages/profile/favorites'
import { IconButton } from 'src/views/components/button'
import Parameters from 'src/views/pages/profile/parameters'
import NewCompany from 'src/views/pages/profile/newCompany'
import CardsAndTransactions from 'src/views/pages/profile/cardsAndTransactions'
import Company from 'src/views/pages/profile/company'

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
    path: '/profile/parameters'
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

const Profile = () => {
  const { width } = useWindowDimensions()
  const [dividerIndexes] = useState([2, 4])
  const [component, setComponent] = useState<any>(<Orders />)
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [selectedRoute, setSelectedRoute] = useState<any>(routes[0])

  const router = useRouter()

  const sidebarClassName = `h-fit w-full large:w-4/12 border border-raisin-10 rounded-3xl p-6 ${
    isSidebarVisible ? 'block' : 'hidden'
  } large:block`

  const contentClassName = `w-full large:w-8/12 large:border large:border-raisin-10 large:rounded-3xl ${
    isSidebarVisible ? 'hidden' : 'block'
  } large:block`

  const getComponentByPath = (path: any) => {
    switch (path) {
      case '/profile':
        return <Orders />
      case '/profile/orders/':
        return <Orders />
      case '/profile/favourites/':
        return <Favourites />
      case '/profile/transactions/':
        return <CardsAndTransactions />
      case '/profile/parameters/':
        return <Parameters />
      case '/profile/bedina-plus/':
        return <Company />
      case '/profile/create-company/':
        return <NewCompany />
      default:
        return component
    }
  }

  const handleRouteChange = (route: any) => {
    router.push(route.path)
    setSelectedRoute(route)
    width < 779 && setIsSidebarVisible(!isSidebarVisible)
  }
  useEffect(() => {
    const currentComponent = getComponentByPath(router.asPath)
    setComponent(currentComponent)
  }, [router.asPath])

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible)

  return (
    <DefaultLayout>
      <SmallerContainer>
        <div>
          <Breadcrumb
            items={[
              { path: '/', label: 'მთავარი' },
              { path: '/profile', label: 'ჩემი გვერდი' },
              { path: selectedRoute.path, label: selectedRoute.item }
            ]}
            onClick={() => {
              if (width < 781) {
                toggleSidebar
              }
            }}
          />

          <div className='flex gap-none large:gap-6 mt-9'>
            <div className={sidebarClassName}>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-5'>
                  <Image src='/images/avatar.png' alt='' className='rounded-full' width={48} height={48} />
                  <Typography type='h5' weight='medium'>
                    ზაური ათაბეგაშვილი
                  </Typography>
                </div>
                <Image src='/icons/chevron.svg' alt='' width={9} height={8} />
              </div>
              <Divider />
              <div>
                {routes.map((route, index) => (
                  <div key={route.id} onClick={() => handleRouteChange(route)}>
                    <div className='flex items-center gap-8 my-4 cursor-pointer'>
                      <div className={`h-8 w-8 rounded-lg bg-raisin-10`}>
                        <Image src={route.icon} alt='' width={3} height={3} />
                      </div>
                      <Typography
                        type='h5'
                        className={`${
                          selectedRoute.path.split('/')[2] === route.path.split('/')[2] ? 'text-orange-100' : ''
                        }'`}
                      >
                        {route.item}
                      </Typography>
                    </div>
                    {dividerIndexes.includes(index) && <Divider />}
                  </div>
                ))}
              </div>
            </div>
            <div></div>
            {width < 779 && isSidebarVisible ? (
              <></>
            ) : (
              <div className={contentClassName}>
                {width < 779 && (
                  <IconButton
                    icon='/icons/chevronLeft.svg'
                    text='ჩემი გვერდი'
                    onClick={toggleSidebar}
                    height={8}
                    width={5}
                  />
                )}
                {component}
              </div>
            )}
          </div>
        </div>
      </SmallerContainer>
    </DefaultLayout>
  )
}

export default Profile
