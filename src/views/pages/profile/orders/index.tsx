import { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'
import OrderComponent from './orderComponent'

const Orders = () => {
  const [details, setDetails] = useState(false)
  const { width } = useWindowDimensions()

  const toggleDetails = () => setDetails(!details)

  return (
    <>
      {details ? (
        <OrderComponent toggleDetails={toggleDetails} />
      ) : (
        <div className=''>
          <div className='flex justify-between p-2 md:p-4 items-center'>
            <Typography type='h3'>ჩემი შეკვეთები</Typography>
            <div className='flex'>
              <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon={'/icons/filters.svg'} />
              <IconTextButton label={width > 779 ? 'ძებნა' : ''} icon={'/icons/sort.svg'} />
            </div>
          </div>
          <Divider />
          <ListComponent toggleDetails={toggleDetails} />
          <ListComponent toggleDetails={toggleDetails} />
          <ListComponent toggleDetails={toggleDetails} />
          <ListComponent toggleDetails={toggleDetails} />
          <ListComponent toggleDetails={toggleDetails} />
          <ListComponent toggleDetails={toggleDetails} />
        </div>
      )}
    </>
  )
}

export default Orders
