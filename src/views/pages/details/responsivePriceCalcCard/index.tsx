import useProfile from 'src/hooks/useProfile'
import { DefaultButton } from 'src/views/components/button'
import Image from 'src/views/components/image'
import Typography from 'src/views/components/typography'

interface Props {
  toggleDrawer: () => void
}

const ResponsivePriceCalcCard: React.FC<Props> = ({ toggleDrawer }) => {
  const { userInfo } = useProfile()
  
  return (
    <section
      className='fixed w-full justify-between bg-white bottom-[75px] shadow-top z-50 rounded-t-3xl flex p-4 md:hidden'
      onClick={toggleDrawer}
    >
      <div className='flex gap-2 items-center'>
        <Typography type='h5' weight='medium' className='text-bold text-raisin-100'>
          27₾
        </Typography>
        <Typography type='body'>/ დღე</Typography>
        <Image src='/icons/chevron.svg' className='rotate-180 cursor-pointer' alt='' />
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
