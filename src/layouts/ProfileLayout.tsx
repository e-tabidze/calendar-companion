import { useRouter } from 'next/router'
import { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import DefaultHeader from 'src/views/components/defaultHeader'
import ProfileNavigation from 'src/views/components/profileNavigation'
import HeaderWrapper from "../views/components/headerWrapper";

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
  pagination?: boolean
  userInfo: any
}

const ProfileLayout: React.FC<Props> = ({ routes, dividerIndexes, children, userInfo }) => {
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
    <main className="pb-20 lg:pb-0">
      <HeaderWrapper fullWidth>
        <DefaultHeader />
      </HeaderWrapper>
      <div className='w-full m-auto 2xl:max-w-[1470px] lg:px-8 2xl:px-0 flex gap-none lg:gap-4 mt-9'>
        <ProfileNavigation
          routes={routes}
          sidebarCollapsed={sidebarCollapsed}
          isSidebarVisible={isSidebarVisible}
          handleRouteChange={handleRouteChange}
          toggleSidebarCollapse={toggleSidebarCollapse}
          selectedRoute={selectedRoute}
          dividerIndexes={dividerIndexes}
          userInfo={userInfo}
        />
        <div className="transition-all duration-300 w-full z-[11]">{children}</div>
      </div>
    </main>
  )
}

export default ProfileLayout
