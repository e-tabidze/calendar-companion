import { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'
import OrderDetails from './orderDetails'
import useUserOrders from './useOrders'

const Orders = () => {
  const [details, setDetails] = useState(false)
  const { width } = useWindowDimensions()
  const { userOrders } = useUserOrders()
  const [orderId, setOrderId] = useState(0)

  console.log(userOrders, 'userOrders')

  const toggleDetails = () => setDetails(!details)

  return (
    <>
      {details ? (
        <OrderDetails toggleDetails={toggleDetails} orderId={orderId} setOrderId={setOrderId} />
      ) : (
        <div className='p-2 md:p-10 md:border border-raisin-10 rounded-3xl'>
          <div className='flex justify-between p-2 md:p-4 items-center'>
            <Typography type='h3'>ჩემი შეკვეთები</Typography>
            <div className='flex gap-4 md:gap-8'>
              <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon='filters' width={22} height={20} />
              <IconTextButton label={width > 779 ? 'ძებნა' : ''} icon='sort' width={20} height={12} />
            </div>
          </div>
          <Divider />
          {userOrders?.map((order: any) => (
            <ListComponent
              key={order?.id}
              toggleDetails={() => {
                toggleDetails()
                setOrderId(order?.id)
              }}
              startAddress={order?.start_address}
              startDate={order?.start_date}
              startTime={order?.start_time}
              endDate={order?.end_date}
              endTime={order?.end_time}
              productDetails={JSON.parse(order?.product_data)}
              price={order?.price}
              status={order?.status_id}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Orders
