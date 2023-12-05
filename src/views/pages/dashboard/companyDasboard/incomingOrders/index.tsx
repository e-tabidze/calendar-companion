import { useRouter } from 'next/router'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import OrderListComponent from 'src/views/pages/dashboard/components/orderListComponent'

const IncomingOrders = () => {
  const { width } = useWindowDimensions()
  const router = useRouter()

  const toggleDetails = () => router.push('/dashboard/orders')

  return (
    <div className='border border-raisin-10 rounded-2xl mt-11'>
      <div className='flex justify-between items-center my-4 px-2 md:px-6 2xl:px-8'>
        <Typography type='h3' className='text-md md:text-2lg'>
          შემოსული ჯავშნები
        </Typography>
        <div className='flex gap-[32px]'>
          <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon={'/icons/filters.svg'} />
          <IconTextButton label={width > 779 ? 'სორტირება' : ''} icon={'/icons/sort.svg'} />
        </div>
      </div>
      <Divider />
      <div className='hidden lg:flex gap-3 p-2 md:p-8'>
        {/* {filters.map(filter => (
          <Tag label={filter.label} height='h-10' key={filter.id} className='rounded-xl' />
        ))} */}
      </div>
      <div className='px-none md:px-6 2xl:px-8'>
        <OrderListComponent toggleDetails={toggleDetails} />
        <OrderListComponent toggleDetails={toggleDetails} />
        <OrderListComponent toggleDetails={toggleDetails} />
        <OrderListComponent toggleDetails={toggleDetails} />
        <OrderListComponent toggleDetails={toggleDetails} />
      </div>
    </div>
  )
}

export default IncomingOrders
