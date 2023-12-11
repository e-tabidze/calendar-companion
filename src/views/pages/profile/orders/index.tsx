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
            <div className='flex gap-4 md:gap-8'>
              <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon='filters' width={22} height={20} />
              <IconTextButton label={width > 779 ? 'ძებნა' : ''} icon='sort' width={20} height={12} />
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
