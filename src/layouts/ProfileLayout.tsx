import { useRouter } from 'next/router'
import { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { HeaderContainer } from 'src/styled/styles'
import DefaultHeader from 'src/views/components/defaultHeader'
import ProfileNavigation from 'src/views/components/profileNavigation'

interface Route {
  id: number
  icon: string
  item: string
  path: string
}

interface Props {
  routes: Route[]
  dividerIndexes: number[]
  children: any
}

const ProfileLayout: React.FC<Props> = ({ routes, dividerIndexes, children }) => {
  const router = useRouter()
  const { width } = useWindowDimensions()
  const [selectedRoute, setSelectedRoute] = useState<any>(routes[0])
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false)

  const handleRouteChange = (route: any) => {
    router.push(route.path)
    setSelectedRoute(route)
    width < 1024 && setIsSidebarVisible(!isSidebarVisible)
  }

  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed)

  return (
    <main>
      <HeaderContainer>
        <DefaultHeader />
      </HeaderContainer>
      <div className='w-full m-auto max-w-[1200px] lg:px-8 2xl:px-0 flex gap-none lg:gap-4 mt-9'>
        <ProfileNavigation
          routes={routes}
          sidebarCollapsed={sidebarCollapsed}
          isSidebarVisible={isSidebarVisible}
          handleRouteChange={handleRouteChange}
          toggleSidebarCollapse={toggleSidebarCollapse}
          selectedRoute={selectedRoute}
          dividerIndexes={dividerIndexes}
        />
        <div className={`w-full z-[111] ${isSidebarVisible ? 'hidden' : 'block'} lg:block`}>{children}</div>
      </div>
    </main>
  )
}

export default ProfileLayout
