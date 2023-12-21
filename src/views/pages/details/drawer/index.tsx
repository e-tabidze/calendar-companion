import useProfile from 'src/hooks/useProfile'
import { DefaultButton } from 'src/views/components/button'
import { Divider } from '../insuranceCard/styles'
import dynamic from 'next/dynamic'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const DrawerBottom = dynamic(() => import('src/views/components/drawer'), { ssr: false })

interface Props {
  isOpenDrawer: boolean
  setIsOpenDrawer: any
  price: number
  dates: string
  days: number | null | undefined
  onClick: () => void
  className?: string
  services?: any
}

const Drawer: React.FC<Props> = ({
  isOpenDrawer,
  setIsOpenDrawer,
  price,
  dates,
  days,
  onClick,
  className,
  services
}) => {
  const { userInfo } = useProfile()

  return (
    <DrawerBottom isOpen={isOpenDrawer} setIsOpen={setIsOpenDrawer} className={className}>
      <div className='flex items-center gap-2'>
        <Typography type='h3' className='font-bold'>
          {price}₾
        </Typography>
        <Typography type='h5' weight='normal'>
          / დღე
        </Typography>
      </div>
      <Typography type='body' className='text-green-100 mb-4'>
        Free cancellation
      </Typography>
      <div className='flex gap-3 items-center mb-4'>
        <div className='flex gap-2'>
          <Typography type='body' className='text-2sm'>
            {dates}
          </Typography>
          <Typography type='body' color='light' className='text-2sm'>
            | {days} days
          </Typography>
        </div>
        <button className='border border-raisin-100 rounded-xl p-1 text-sm'>შეცვლა</button>
      </div>
      <Divider />
      <Typography type='h5' weight='medium' className='mt-8 mb-5 font-bold'>
        ფასების დეტალები
      </Typography>

      <div className='flex gap-2 justify-between'>
        <div className='flex gap-2'>
          <Typography type='body' className='text-raisin-100'>
            მანქანის ქირაობის საკომისიო
          </Typography>
          <Typography type='body' color='light'>
            | {days} დღე
          </Typography>
        </div>
        <Typography type='h5' weight='normal'>
          {days && days * price + ' ₾'}
        </Typography>
      </div>

      {services?.map((service: any) => (
        <div className='flex gap-2 flex-col justify-between py-2 lg:items-center lg:flex-row' key={service.id}>
          <div className='flex gap-2'>
            <Typography type='body' className='text-raisin-100'>
              {service?.title}
            </Typography>
            <Typography type='body' color='light'>
              | რაოდენობა: {service?.count}
            </Typography>
          </div>
          <Typography type='h5' weight='normal'>
            {service?.type_id == 1 ? service?.count * service?.price * days! : service?.count * service.price} ₾
          </Typography>
        </div>
      ))}

      <div className='w-full h-px bg-raisin-10 mt-7' />

      <div className='flex justify-between py-1 pt-4 pb-7'>
        <Typography type='h5' weight='medium' className='font-bold'>
          ჯამი
        </Typography>
        <Typography type='h5' weight='normal' className='text-orange-100'>
          {services?.reduce((accumulator: number, service: { type_id: number; count: number; price: number }) => {
            if (service.type_id === 1) {
              accumulator += service.count * service.price * days!
            } else {
              accumulator += service.count * service.price
            }
            
            return accumulator
          }, 0) +
            price * days!}
        </Typography>
      </div>
      {userInfo?.active_profile_id ? (
        <>
          {userInfo?.active_profile_id === userInfo?.UserID && (
            <DefaultButton
              bg='bg-orange-100'
              text='ჯავშნის დაწყება'
              className='w-full'
              textColor='text-white'
              onClick={onClick}
            />
          )}
        </>
      ) : (
        <Typography type='subtitle' className='text-orange-100'>
          ჯავშნის გასაგრძელებლად გთხოვთ შეხვიდეთ სისტემაში
        </Typography>
      )}
    </DrawerBottom>
  )
}

export default Drawer
