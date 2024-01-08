import { useRouter } from 'next/router'
import useProfile from 'src/hooks/useProfile'
import Icon from 'src/views/app/Icon'
import Divider from '../divider'
import Image from '../image'
import Typography from '../typography'

interface Route {
  id: number
  icon: string
  item: string
  path?: string
  image?: string
  onClick?: any
}
interface Props {
  routes: Route[]
  sidebarCollapsed: boolean
  isSidebarVisible: boolean
  handleRouteChange: (route: Route) => void
  toggleSidebarCollapse: () => void
  selectedRoute: Route
  dividerIndexes: number[]
}
const ProfileNavigation: React.FC<Props> = ({
  routes,
  sidebarCollapsed,
  handleRouteChange,
  toggleSidebarCollapse,
  selectedRoute,
  dividerIndexes
}) => {
  const { userInfo, activeCompany, isAuthenticated, handleLogout, defaultImgUrl } = useProfile()

  const router = useRouter()

  return (
    <div
      className={`hidden lg:flex h-fit mx-3 border border-raisin-10 rounded-3xl py-8 shrink-0  flex-col transition-all duration-300
       ${sidebarCollapsed ? 'w-[103px] px-3' : 'lg:w-[103px] lg:px-3 xl:w-[300px] 2xl:w-[350px] xl:px-6'}`}
    >
      <div
        className={`${
          sidebarCollapsed ? 'px-[14px]' : 'lg:px-[14px] xl:px-0'
        } flex justify-between items-center mb-6 w-full overflow-hidden `}
      >
        <div className='flex items-center'>
          <div className='flex shrink-0 w-12 h-12 relative rounded-full overflow-hidden'>
            <Image
              onError={(ev: any) => {
                ev.target.src = `/icons/avatar.svg`
              }}
              src={isAuthenticated && !!activeCompany ? activeCompany?.information.logo : defaultImgUrl}
              alt='avatar'
              className='object-cover w-full h-full'
              width={48}
              height={48}
            />
          </div>
          <Typography
            type='h5'
            weight='medium'
            className={`overflow-hidden transition-all duration-300 text-2sm 2xl-4 ${
              sidebarCollapsed ? 'w-0 opacity-0' : 'xl:ml-4 xl:w-full opacity-0 xl:opacity-100'
            }`}
          >
            {!!activeCompany ? (
              activeCompany?.information.name
            ) : (
              <>
                {userInfo?.information?.first_name} {userInfo?.information?.last_name}
              </>
            )}
          </Typography>
        </div>
        <div
          className={`${
            sidebarCollapsed ? 'w-0 opacity-0' : 'w-6 opacity-100'
          } cursor-pointer transition duration-300 flex h-6 rounded-full bg-raisin-10 justify-center items-center shrink-0`}
          onClick={toggleSidebarCollapse}
        >
          <Icon svgPath='chevron-l' width={8} height={12} />
        </div>
      </div>
      <div
        className={`${
          sidebarCollapsed ? 'mx-auto xl:mb-6 xl:w-6 xl:h-6 xl:opacity-100 lg:w-0 lg:opacity-0' : 'w-0 opacity-0'
        } cursor-pointer transition duration-300 flex rounded-full bg-raisin-10 justify-center items-center shrink-0`}
        onClick={toggleSidebarCollapse}
      >
        <Icon
          svgPath='chevron-l'
          width={8}
          height={12}
          className={`fill-transparent cursor-pointer ${sidebarCollapsed ? 'transform rotate-180' : ''} `}
        />
      </div>
      <Divider className='mb-4' />
      {routes.map((route, index) => (
        <div key={route.id} onClick={route.path ? () => handleRouteChange(route) : handleLogout}>
          <div
            className={`group relative flex items-center my-2  cursor-pointer transition-all duration-300 ${
              sidebarCollapsed ? 'px-5' : 'lg:px-5 xl:px-0 2xl:px-4'
            }`}
          >
            <span className="transition-all duration-300 opacity-0 hidden group-hover:flex group-hover:opacity-100 xl:group-hover:opacity-0 z-[111] after:content[''] after:absolute after:left-[-6px] after:w-0 after:h-0 after:border-t-[6px] after:border-b-[6px] after:border-r-[6px] after:border-t-transparent  after:border-b-transparent after:border-r-raisin-100 absolute items-center bg-raisin-100 left-full ml-[-10px] top-1/2 -translate-y-1/2 text-white text-sm h-8 px-3 rounded-lg">
              {route.item}
            </span>
            <div
              className={`flex items-center justify-center shrink-0 relative overflow-hidden h-8 w-8 rounded-lg ${
                route.path === router?.asPath ? 'bg-orange-10' : 'bg-raisin-10'
              } `}
            >
              {route.image ? (
                <Image
                  src={route.image || ''}
                  alt=''
                  className='object-cover w-full h-full'
                  onError={(ev: any) => {
                    ev.target.src = `/icons/avatar.svg`
                  }}
                />
              ) : (
                <Icon
                  svgPath={route.icon}
                  width={20}
                  height={20}
                  color='#fff'
                  className={`${route.path === router?.asPath ? 'fill-orange-100' : 'fill-raisin-70'}`}
                />
              )}
            </div>
            <Typography
              type='h5'
              className={`transition-all duration-300 overflow-hidden text-2sm 2xl:text-md ${
                sidebarCollapsed ? 'opacity-0' : 'opacity-100 ml-4 2xl:ml-6'
              } ${
                route.path && selectedRoute?.path?.split('/')[2] === route.path.split('/')[2] ? 'text-orange-100' : ''
              }' ${route.path === router?.asPath && 'text-orange-100'}`}
            >
              <> {console.log(route?.path, router?.asPath, '?')}</>
              {route.item}
            </Typography>
          </div>
          {dividerIndexes.includes(index) && <Divider className='mt-6 mb-4' />}
        </div>
      ))}
    </div>
  )
}

export default ProfileNavigation
