import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Typography from '../../typography'
import Icon from '../../../app/Icon'
import useNotifications from 'src/hooks/useNotifications'
import Link from 'next/link'
import useProfile from 'src/hooks/useProfile'

const Notification = () => {
  const { notifictions } = useNotifications()
  const { activeCompany } = useProfile()

  return (
    <Menu as='div' className='hidden md:flex relative'>
      <Menu.Button>
        <div className='relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-grey-100 transition-all'>
          <Icon svgPath='bell' width={25} height={24} className='rounded-full' />
          <span className='absolute right-0 top-0 mt-1 mr-1 w-3 h-3 flex items-center justify-center orange-100 rounded-full text-white text-[10px] font-medium'>
            3
          </span>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='w-[348px] absolute z-2 top-full left-1/2 -translate-x-1/2 mt-5 bg-white rounded-2xl shadow-sm'>
          <div className='border-b-1 border-raisin-10 p-4 text-md font-bold text-raisin-100'>შეტყობინებები</div>
          <ul className='py-6 max-h-[320px] overflow-y-auto'>
            {notifictions
              ?.filter((not: any) => not.read_at === null)
              ?.map((notification: any) => (
                <li key={notification?.id}>
                  <a href='#' className='px-4 flex items-center py-2 relative'>
                    <span
                      className={`w-1 h-1 rounded-full ${
                        notification?.data.color === 'yellow'
                          ? 'bg-yellow-100'
                          : notification?.data.color === 'red'
                          ? 'bg-orange-100'
                          : 'bg-green-100'
                      }  absolute left-[6px] top-1/2 -translate-y-1/2`}
                    ></span>
                    <span className='w-10 h-10 bg-grey-100 rounded-xl mr-4 flex items-center justify-center shrink-0'>
                      <Icon
                        svgPath={`${
                          notification?.data.color === 'yellow'
                            ? 'notification'
                            : notification?.data.color === 'red'
                            ? 'info'
                            : 'notification'
                        }`}
                        width={24}
                        height={24}
                        className={`${
                          notification?.data.color === 'yellow'
                            ? 'fill-yellow-110'
                            : notification?.data.color === 'red'
                            ? 'fil-orange-110'
                            : 'fill-green-100'
                        }`}
                      />
                    </span>
                    <div className='flex flex-col'>
                      <Typography type='h5' className='text-2sm font-medium text-raisin-100'>
                        {notification?.data?.text}
                      </Typography>
                      <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                        2 დღის წინ
                      </Typography>
                    </div>
                  </a>
                </li>
              ))}
          </ul>
          <Link
            className='flex justify-center border-t-1 border-raisin-10 p-4 text-2sm font-medium text-raisin-100'
            href={!!activeCompany ? '/dashboard/notifications' : '/profile/notifications'}
          >
            ნახე ყველა
          </Link>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Notification
