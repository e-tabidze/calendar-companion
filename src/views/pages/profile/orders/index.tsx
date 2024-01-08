import Link from 'next/link'
import { useRouter } from 'next/router'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'
import OrderDetails from './orderDetails'
import useUserOrders from './useOrders'

const Orders = () => {
  const { userOrders } = useUserOrders()

  const router = useRouter()

  return (
    <>
      {router.query.id ? (
        <OrderDetails />
      ) : (
        <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl'>
          <Typography type='h3' className='mb-6'>
            ჩემი შეკვეთები
          </Typography>

          <Divider />
          {userOrders?.map((order: any) => (
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
          ))}
        </div>
      )}
    </>
  )
}

export default Orders
