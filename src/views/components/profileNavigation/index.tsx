import { useRouter } from 'next/router'
import useProfile from 'src/hooks/useProfile'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
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

  const { width } = useWindowDimensions()

  return (
    <div
      className={`md:min-h-[520px] px-3 lg:px-6 border border-raisin-10 rounded-3xl py-8 shrink-0 h-fit
    ${
      sidebarCollapsed
        ? 'w-[103px] shrink-0 flex flex-col items-center transition-all duration-300'
        : 'w-[350px] shrink-0'
    }
      `}
    >
      <div
        className={` 
        flex justify-between items-center mb-6 w-full overflow-hidden `}
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
            className={` overflow-hidden transition-all duration-300 text-2sm 2xl-4 ${
              sidebarCollapsed ? '!w-0 opacity-0' : 'ml-4 xl:w-full xl:opacity-100'
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
          className={`hidden lg:flex ${
            sidebarCollapsed ? 'w-0 opacity-0' : 'w-6 opacity-100'
          } cursor-pointer transition duration-300 flex h-6 rounded-full bg-raisin-10 justify-center items-center shrink-0`}
          onClick={toggleSidebarCollapse}
        >
          <Icon svgPath='chevron-l' width={8} height={12} />
        </div>
      </div>
      <div
        className={` ${
          width > 1023 && sidebarCollapsed
            ? 'flex cursor-pointer w-6 h-6 shrink-0 bg-raisin-10 rounded-full justify-center items-center mb-4 transition-all duration-300'
            : 'hidden'
        }`}
        onClick={toggleSidebarCollapse}
      >
        <Icon
          svgPath='chevron-l'
          width={8}
          height={12}
          className={`fill-transparent cursor-pointer ${sidebarCollapsed ? 'transform rotate-180' : ''}`}
        />
      </div>
      <Divider className='mb-4' />
      {routes.map((route, index) => (
        <div key={route.id} onClick={route.path ? () => handleRouteChange(route) : handleLogout}>
          <div className={`group relative flex items-center my-2  cursor-pointer transition-all duration-300`}>
            <div
              className={`flex items-center justify-center shrink-0 relative overflow-hidden h-8 w-8 rounded-lg ${
                route.path?.split('?')[0] === router.asPath.split('?')[0].replace(/\/$/, '') ||
                route.path === router.asPath
                  ? 'bg-orange-10'
                  : 'bg-raisin-10'
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
                  className={`${
                    route.path?.split('?')[0] === router.asPath.split('?')[0].replace(/\/$/, '') ||
                    route.path === router.asPath
                      ? 'fill-orange-100'
                      : 'fill-raisin-70'
                  }`}
                />
              )}
            </div>
            <Typography
              type='h5'
              className={`transition-all duration-300 overflow-hidden text-2sm 2xl:text-md ${
                sidebarCollapsed ? 'opacity-0 w-0' : 'opacity-100 ml-4 2xl:ml-6'
              } ${
                route.path && selectedRoute?.path?.split('/')[2] === route.path.split('/')[2] ? 'text-orange-100' : ''
              }' ${
                route.path?.split('?')[0] === router.asPath.split('?')[0].replace(/\/$/, '') ||
                route.path === router.asPath
                  ? 'text-orange-100'
                  : ''
              }`}
            >
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
