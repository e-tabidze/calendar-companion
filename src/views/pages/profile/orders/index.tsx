import { useState } from 'react'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'
import OrderDetails from './orderDetails'
import useUserOrders from './useOrders'

const Orders = () => {
  const [details, setDetails] = useState(false)
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
          <Typography type='h3' className='mb-6'>
            ჩემი შეკვეთები
          </Typography>

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
