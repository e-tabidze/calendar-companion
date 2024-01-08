import { useRouter } from 'next/router'
import { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import DefaultHeader from 'src/views/components/defaultHeader'
import ProfileNavigation from 'src/views/components/profileNavigation'
import HeaderWrapper from '../views/components/headerWrapper'
import Footer from 'src/views/components/footer'

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
    width < 1024 && setIsSidebarVisible(!isSidebarVisible)
  }

  console.log(isSidebarVisible, 'isSidebarVisible')

  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  console.log(width, 'width')

  return (
    <main>
      <HeaderWrapper fullWidth>
        <DefaultHeader />
      </HeaderWrapper>
      <div className={'w-full m-auto 2xl:max-w-[1470px] lg:px-8 2xl:px-0 flex gap-none lg:gap-4 lg:mt-10'}>
        <ProfileNavigation
          routes={routes}
          sidebarCollapsed={sidebarCollapsed}
          handleRouteChange={handleRouteChange}
          toggleSidebarCollapse={toggleSidebarCollapse}
          selectedRoute={selectedRoute}
          dividerIndexes={dividerIndexes}
        />
        <div className={'transition-all duration-300 w-full z-[11] p-4 lg:p-0'}>
          <div onClick={() => setIsSidebarVisible(false)}>back</div>
          {children}
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default ProfileLayout
