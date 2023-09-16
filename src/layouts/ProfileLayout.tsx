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
  sidebarCollapsed: boolean
  isSidebarVisible: boolean
  handleRouteChange: (route: Route) => void
  toggleSidebarCollapse: () => void
  selectedRoute: Route
  dividerIndexes: number[]
  children: any
}

const ProfileLayout: React.FC<Props> = ({
  routes,
  sidebarCollapsed,
  isSidebarVisible,
  handleRouteChange,
  toggleSidebarCollapse,
  selectedRoute,
  dividerIndexes,
  children
}) => {
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
