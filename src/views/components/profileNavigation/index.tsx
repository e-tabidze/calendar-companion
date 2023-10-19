import Image from 'next/image'
import useProfile from 'src/hooks/useProfile'
import Divider from '../divider'
import Typography from '../typography'

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
}
const ProfileNavigation: React.FC<Props> = ({
  routes,
  sidebarCollapsed,
  isSidebarVisible,
  handleRouteChange,
  toggleSidebarCollapse,
  selectedRoute,
  dividerIndexes
}) => {
  const { userInfo } = useProfile()

  return (
    <div
      className={`h-fit w-full mx-4 lg:mx-4 lg:w-fit border border-raisin-10 rounded-3xl p-6 ${
        isSidebarVisible ? 'block' : 'hidden'
      } lg:block`}
    >
      <div
        className={`flex items-center justify-between mb-4 gap-4 w-full ${sidebarCollapsed ? 'flex-col' : 'flex-row'} `}
      >
        <div className='flex items-center gap-5'>
          <Image src='/images/avatar.png' alt='' className='rounded-full' width={48} height={48} />
          <Typography type='h5' weight='medium' className={`${sidebarCollapsed ? 'hidden' : 'inline-block'}`}>
            {userInfo?.information?.first_name} {userInfo?.information?.last_name}
          </Typography>
        </div>
        <div
          className='hidden lg:flex w-6 h-6 rounded-full bg-raisin-10 justify-center items-center'
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
              <div className={`h-8 w-8 rounded-lg bg-raisin-10 flex items-center justify-center`}>
                <Image src={route.icon} alt='' width={20} height={20} />
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
  )
}

export default ProfileNavigation
