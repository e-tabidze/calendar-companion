import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import DefaultHeader from 'src/views/components/defaultHeader'
import ProfileNavigation from 'src/views/components/profileNavigation'
import HeaderWrapper from '../views/components/headerWrapper'
import Footer from 'src/views/components/footer'
import Typography from 'src/views/components/typography'
import Icon from 'src/views/app/Icon'

interface Route {
  id: number
  icon: string
  item: string
  path?: string
  onClick?: any
}

interface Props {
  routes: Route[]
  dividerIndexes: number[]
  children: any
  pagination?: boolean
}

const ProfileLayout: React.FC<Props> = ({ routes, dividerIndexes, children }) => {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const [selectedRoute, setSelectedRoute] = useState<any>(routes[0])
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)

  const handleRouteChange = (route: any) => {
    if (route.path) {
      router.push(route.path)
    }
    setSelectedRoute(route)
    width < 769 && setIsSidebarVisible(false)
  }

  console.log(isSidebarVisible, 'isSidebarVisible')

  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  console.log(width, 'width')

  useEffect(() => {
    setSidebarCollapsed(width > 768 && width < 1024)
  }, [width])

  console.log(isSidebarVisible, 'isSidebarVisible')

  return (
    <main>
      <HeaderWrapper fullWidth>
        <DefaultHeader />
      </HeaderWrapper>
      <div className='w-full m-auto flex gap-none px-5 md:px-10 lg:gap-4 mt-1 lg:mt-10'>
        <ProfileNavigation
          routes={routes}
          sidebarCollapsed={sidebarCollapsed}
          handleRouteChange={handleRouteChange}
          toggleSidebarCollapse={toggleSidebarCollapse}
          selectedRoute={selectedRoute}
          dividerIndexes={dividerIndexes}
          isSidebarVisible={isSidebarVisible}
        />
        <div
          className={
            isSidebarVisible && width < 769 ? 'hidden' : 'transition-all duration-300 w-full z-[11] p-0 md:p-4 lg:p-0'
          }
        >
          <div onClick={() => setIsSidebarVisible(true)} className="flex items-center gap-3 md:hidden">
            <Icon svgPath='chevron-l' width={8} height={12} className='fill-transparent' />
            <Typography type='body'>ჩემი გვერდი</Typography>
          </div>

          {children}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ProfileLayout
