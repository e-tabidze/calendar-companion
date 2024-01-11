import Link from 'next/link'
import { useRouter } from 'next/router'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'
import OrderDetails from './orderDetails'
import useUserOrders from './useOrders'

const Orders = () => {
  const { userOrders, useUserOrdersLoading } = useUserOrders()

  const router = useRouter()

  if (useUserOrdersLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      {router.query.id ? (
        <OrderDetails />
      ) : (
        <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
          <Typography type='h3' className='mb-6'>
            ჩემი შეკვეთები
          </Typography>

          <Divider />
          {userOrders?.length > 0 ? (
            userOrders?.map((order: any) => (
              <Link href={`/profile/orders/?id=${order?.id}`} as={`/profile/orders/?id=${order?.id}`} key={order?.id}>
                <ListComponent
                  key={order?.id}
                  startAddress={order?.start_address}
                  startDate={order?.start_date}
                  startTime={order?.start_time}
                  endDate={order?.end_date}
                  endTime={order?.end_time}
                  productDetails={JSON.parse(order?.product_data)}
                  price={order?.price}
                  status={order?.status_id}
                />
              </Link>
            ))
          ) : (
            <DataPlaceHolder label='შეკვეთები ჯერ არ გაქვს' />
          )}
        </div>
      )}
    </>
  )
}

export default Orders
