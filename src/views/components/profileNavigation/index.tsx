import Image from 'next/image'
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
  handleRouteChange,
  toggleSidebarCollapse,
  selectedRoute,
  dividerIndexes
}) => {
  return (
    <div
      className={`hidden lg:flex h-fit mx-3 border border-raisin-10 rounded-3xl py-8 shrink-0  flex-col transition-all duration-300
       ${sidebarCollapsed ? 'w-[103px] px-3' : 'w-[350px] px-6'}`}
    >
      <div
        className={`${
          sidebarCollapsed ? 'px-[14px]' : ''
        } flex justify-between items-center mb-6 w-full overflow-hidden `}
      >
        <div className='flex items-center'>
          <div className='flex shrink-0'>
            <Image src='/images/avatar.png' alt='' className='rounded-full' width={48} height={48} />
          </div>
          <Typography
            type='h5'
            weight='medium'
            className={`overflow-hidden transition-all duration-300 ${
              sidebarCollapsed ? 'w-0 opacity-0' : 'ml-4 w-full opacity-1'
            }`}
          >
            ბენე ექსკლუზივი
          </Typography>
        </div>
        <div
          className={`${
            sidebarCollapsed ? 'w-0 opacity-0' : 'w-6 opacity-1'
          } transition duration-300 flex h-6 rounded-full bg-raisin-10 justify-center items-center shrink-0`}
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
      <div
        className={`${
          sidebarCollapsed ? 'mx-auto mb-6 w-6 h-6 opacity-1' : 'w-0 opacity-0'
        } transition duration-300 flex rounded-full bg-raisin-10 justify-center items-center shrink-0`}
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
      <Divider className='mb-4' />
      {routes.map((route, index) => (
        <div key={route.id} onClick={() => handleRouteChange(route)}>
          <div
            className={`flex items-center my-2  cursor-pointer transition-all duration-300 ${
              sidebarCollapsed ? 'px-5' : 'px-4'
            }`}
          >
            <div className={`h-8 w-8 rounded-lg bg-raisin-10 flex items-center justify-center shrink-0`}>
              <Image src={route.icon} alt='' width={20} height={20} />
            </div>
            <Typography
              type='h5'
              className={`transition-all duration-300 overflow-hidden ${
                sidebarCollapsed ? 'opacity-0' : 'opacity-1 ml-6'
              } ${selectedRoute.path.split('/')[2] === route.path.split('/')[2] ? 'text-orange-100' : ''}'`}
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
