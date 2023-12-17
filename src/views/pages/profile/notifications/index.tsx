import useNotifications from 'src/hooks/useNotifications'
import Typography from 'src/views/components/typography'
import Icon from '../../../app/Icon'

import { parseISO, format } from 'date-fns'
import { ka } from 'date-fns/locale'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Details from './details'

const Notifications = () => {
  const { notifictions } = useNotifications()

  const router = useRouter()

  return (
    <>
      {router.query.id ? (
        <Details />
      ) : (
        <div className='border border-raisin-10 rounded-2xl md:rounded-3xl p-6 md:py-10 md:px-8'>
          <div className='flex justify-between items-center pb-4'>
            <Typography type='h3' className='font-bold md:font-normal text-2sm md:text-2lg'>
              შეტყობინებები
            </Typography>
            <button className='text-sm md:text-2sm text-black ml-10 whitespace-normal'>
              ყველას წაკითხულად მონიშვნა
            </button>
          </div>
          <ul>
            {notifictions?.map((notification: any) => (
              <Link
                href={`/profile/notifications/?id=${notification?.id}`}
                as={`/profile/notifications/?id=${notification?.id}`}
                key={notification?.id}
              >
                <li>
                  <div className='py-4 flex items-center justify-between border-t-1 border-raisin-10 relative'>
                    <span className='w-2 h-2 rounded-full bg-orange-100 absolute left-[-17px] top-8'></span>
                    <div className='flex'>
                      {notification?.read_at === null && (
                        <span className='w-10 h-10 bg-grey-100 rounded-xl mr-4 flex items-center justify-center shrink-0'>
                          <Icon svgPath='approved' width={24} height={24} />
                        </span>
                      )}
                      <div className='flex flex-col'>
                        <Typography type='h5' className='text-2sm md:text-md font-medium text-raisin-100'>
                          შემოსულია ახალი ჯავშანი {notification?.data?.text}
                        </Typography>
                        <Typography type='subtitle' className='text-sm md:text-2sm font-normal text-raisin-100'>
                          მართვის მოწმობის თეორიული და პრაქტიკული (მეორე ეტაპი) გამოცდის ჯავშანი. სატრასპორტო
                        </Typography>
                        <Typography type='subtitle' className='text-sm font-normal text-raisin-30'>
                          {format(parseISO(notification?.created_at), 'd MMM yyyy HH:mm', { locale: ka })}
                        </Typography>
                      </div>
                    </div>
                    <button className='hidden sm:flex w-10 h-10 bg-grey-100 rounded-full ml-4 items-center justify-center shrink-0'>
                      <Icon svgPath='chevron-right' width={20} height={20} className='fill-transparent' />
                    </button>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}

export default Notifications
