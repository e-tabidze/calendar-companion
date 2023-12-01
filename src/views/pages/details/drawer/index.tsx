import { DefaultButton } from 'src/views/components/button'
import DrawerBottom from 'src/views/components/drawer'
import Typography from 'src/views/components/typography'
import { Divider } from '../insuranceCard/styles'

interface Props {
  isOpenDrawer: boolean
  setIsOpenDrawer: any
  price: number
  dates: string
  days: number | null
  onClick: () => void
  className?: string
}

const Drawer: React.FC<Props> = ({ isOpenDrawer, setIsOpenDrawer, price, dates, days, onClick, className }) => {
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

      <div className='w-full h-px bg-raisin-10 mt-7' />

      <div className='flex justify-between py-1 pt-4 pb-7'>
        <Typography type='h5' weight='medium' className='font-bold'>
          ჯამი
        </Typography>
        <Typography type='h5' weight='normal' className='text-orange-100'>
          {days && days * price + ' ₾'}
        </Typography>
      </div>
      <DefaultButton
        bg='bg-orange-100'
        text='ჯავშნის დაწყება'
        className='w-full'
        textColor='text-white'
        onClick={onClick}
      />
    </DrawerBottom>
  )
}

export default Drawer
