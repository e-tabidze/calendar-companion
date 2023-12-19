import useProfile from 'src/hooks/useProfile'
import { DefaultButton } from 'src/views/components/button'
import Typography from 'src/views/components/typography'
import Icon from "src/views/app/Icon";

interface Props {
  toggleDrawer: () => void
  bookingModal?: boolean
  price: string | number
}

const ResponsivePriceCalcCard: React.FC<Props> = ({ toggleDrawer, bookingModal, price }) => {
  const { userInfo } = useProfile()

  return (
    <section
      className={`${
        bookingModal ? 'bottom-0' : 'bottom-[74px]'
      } border-b-1 border-raisin-10 fixed w-full justify-between bg-white shadow-top z-[1] rounded-t-3xl flex p-4 md:hidden`}
      onClick={toggleDrawer}
    >
      <div className='flex gap-2 items-center'>
        <Typography type='h5' weight='medium' className='text-bold text-raisin-100'>
          {price}₾
        </Typography>
        <Typography type='body'>/ დღე</Typography>
        <Icon svgPath='chevron' width={8} height={6} className='fill-transparent rotate-180 cursor-pointer' />
      </div>
      {userInfo?.active_profile_id === userInfo?.UserID && (
        <DefaultButton bg='bg-orange-100' text='ჯავშნის დაწყება' textColor='text-white'>
          ჯავშნის დაწყება
        </DefaultButton>
      )}
    </section>
  )
}

export default ResponsivePriceCalcCard
