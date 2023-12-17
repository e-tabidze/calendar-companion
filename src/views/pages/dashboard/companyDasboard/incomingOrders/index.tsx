import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import OrderListComponent from 'src/views/pages/dashboard/components/orderListComponent'

const IncomingOrders = () => {
  const { width } = useWindowDimensions()

  return (
    <div className='border border-raisin-10 rounded-2xl mt-11'>
      <div className='flex justify-between items-center my-4 px-2 md:px-6 2xl:px-8'>
        <Typography type='h3' className='text-md md:text-2lg'>
          შემოსული ჯავშნები
        </Typography>
        <div className='flex gap-4 md:gap-8'>
          <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon='filters' width={22} height={20} />
          <IconTextButton label={width > 779 ? 'სორტირება' : ''} icon='sort' width={20} height={12} />
        </div>
      </div>
      <Divider />
      <div className='hidden lg:flex gap-3 p-2'>
        {/* {filters.map(filter => (
          <Tag label={filter.label} height='h-10' key={filter.id} className='rounded-xl' />
        ))} */}
      </div>
      <div className='px-none md:px-6 2xl:px-8'>
        <OrderListComponent
          startAddress={''}
          startDate={''}
          startTime={''}
          endDate={''}
          endTime={''}
          firstName={''}
          lastName={''}
          days={0}
          productDetails={undefined}
          price={0}
          discount={0}
          status={0}
        />
        <OrderListComponent
          startAddress={''}
          startDate={''}
          startTime={''}
          endDate={''}
          endTime={''}
          firstName={''}
          lastName={''}
          days={0}
          productDetails={undefined}
          price={0}
          discount={0}
          status={0}
        />
        <OrderListComponent
          startAddress={''}
          startDate={''}
          startTime={''}
          endDate={''}
          endTime={''}
          firstName={''}
          lastName={''}
          days={0}
          productDetails={undefined}
          price={0}
          discount={0}
          status={0}
        />
        <OrderListComponent
          startAddress={''}
          startDate={''}
          startTime={''}
          endDate={''}
          endTime={''}
          firstName={''}
          lastName={''}
          days={0}
          productDetails={undefined}
          price={0}
          discount={0}
          status={0}
        />
        <OrderListComponent
          startAddress={''}
          startDate={''}
          startTime={''}
          endDate={''}
          endTime={''}
          firstName={''}
          lastName={''}
          days={0}
          productDetails={undefined}
          price={0}
          discount={0}
          status={0}
        />
      </div>
    </div>
  )
}

export default IncomingOrders
