import { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Pagination from 'src/views/components/pagination'
import Tag from 'src/views/components/tag'
import Typography from 'src/views/components/typography'

import ListComponent from '../components/orderListComponent'
import OrderDetails from './orderDetails'

const filters = [
  {
    label: 'ყველა',
    id: '1'
  },
  {
    label: 'დასრულებული',
    id: '2'
  },
  {
    label: 'მოლოდინში',
    id: '3'
  },
  {
    label: 'გაუქმებული',
    id: '4'
  },
  {
    label: 'დადასტურებული',
    id: '5'
  },
  {
    label: 'უარყოფილი',
    id: '6'
  }
]

const IncomingOrders = () => {
  const [details, setDetails] = useState(false)
  const { width } = useWindowDimensions()

  const toggleDetails = () => setDetails(!details)

  return (
    <>
      {details ? (
        <OrderDetails toggleDetails={toggleDetails} />
      ) : (
        <div className='mx-4 md:mx-0'>
          <div className='border border-raisin-10 rounded-2xl'>
            <div className='flex justify-between items-center my-4 px-2 md:px-6 2xl:px-8'>
              <Typography type='h3' className='text-md md:text-2lg'>
                შემოსული ჯავშნები
              </Typography>
              <div className='flex gap-[16px] md:gap-[32px]'>
                <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon={'/icons/filters.svg'} />
                <IconTextButton label={width > 779 ? 'სორტირება' : ''} icon={'/icons/sort.svg'} />
              </div>
            </div>
            <div className='hidden lg:flex gap-3 p-2 md:p-8'>
              {filters.map(filter => (
                <Tag label={filter.label} height='h-10' key={filter.id} className='rounded-xl' />
              ))}
            </div>
            <div className='px-none md:px-6 2xl:px-8'>
              <Divider />
              <ListComponent toggleDetails={toggleDetails} />
              <ListComponent toggleDetails={toggleDetails} />
              <ListComponent toggleDetails={toggleDetails} />
              <ListComponent toggleDetails={toggleDetails} />
              <ListComponent toggleDetails={toggleDetails} />
            </div>
          </div>
          <Pagination totalPages={20} onPageChange={() => console.log('change Page')} />
        </div>
      )}
    </>
  )
}

export default IncomingOrders
