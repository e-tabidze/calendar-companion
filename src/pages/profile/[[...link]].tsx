import { useRouter } from 'next/router'
import { useState } from 'react'
import DefaultLayout from 'src/layouts/DefaultLayout'
import { ContentContainer } from 'src/styled/styles'
import Breadcrumb from 'src/views/components/breadcrumb'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import Orders from 'src/views/pages/profile/orders'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import Image from 'next/image'
import Favourites from 'src/views/pages/profile/favorites'
import { IconButton } from 'src/views/components/button'
import PersonalInfo from 'src/views/pages/profile/personal-information'
import CreateCompany from 'src/views/pages/profile/createCompany'
import CardsAndTransactions from 'src/views/pages/profile/cardsAndTransactions'
import Company from 'src/views/pages/profile/company'
import useProfile from 'src/hooks/useProfile'
import { UserInfo } from 'src/types/User'

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
      return <PersonalInfo userData={userInfo} />
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
  const [dividerIndexes] = useState([2, 4])
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [selectedRoute, setSelectedRoute] = useState<any>(routes[0])

  const { showProfile, setShowProfile, showRightTab, setShowRightTab, userInfo, router, isLoading } = useProfile()

  const sidebarClassName = `h-fit w-full laptop:w-4/12 border border-raisin-10 rounded-3xl p-6 ${
    isSidebarVisible ? 'block' : 'hidden'
  } laptop:block`

  const contentClassName = `w-full z-[111] laptop:w-8/12 laptop:border laptop:border-raisin-10 laptop:rounded-3xl ${
    isSidebarVisible ? 'hidden' : 'block'
  } laptop:block`

  console.log(userInfo, 'userInfo')
  console.log(isLoading, 'isLoading')

  const handleRouteChange = (route: any) => {
    router.push(route.path)
    setSelectedRoute(route)
    width < 1024 && setIsSidebarVisible(!isSidebarVisible)
  }

  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible)

  return (
    <>
      {router.asPath === '/profile/create-company/' ? (
        <CreateCompany />
      ) : (
        <DefaultLayout>
          <ContentContainer>
            <div>
              <Breadcrumb
                items={[
                  { path: '/', label: 'მთავარი' },
                  { path: '/profile', label: 'ჩემი გვერდი' },
                  { path: selectedRoute.path, label: selectedRoute.item }
                ]}
                onClick={() => {
                  if (width < 1024) {
                    toggleSidebar
                  }
                }}
              />

              <div className='flex gap-none laptop:gap-6 mt-9'>
                <div className={sidebarClassName}>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center gap-5'>
                      <Image src='/images/avatar.png' alt='' className='rounded-full' width={48} height={48} />
                      <Typography type='h5' weight='medium'>
                        {userInfo?.FirstName} {userInfo?.LastName}
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
                {width < 1024 && isSidebarVisible ? (
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
                    {/* {!isLoading && userInfo ? component : <div>Loading...</div>} */}
                    <ProfileRouter userInfo={userInfo} />
                  </div>
                )}
              </div>
            </div>
          </ContentContainer>
        </DefaultLayout>
      )}
    </>
  )
}

export default Profile
