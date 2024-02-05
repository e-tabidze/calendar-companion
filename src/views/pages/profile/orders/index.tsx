import Link from 'next/link'
import { useRouter } from 'next/router'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import Divider from 'src/views/components/divider'
import Pagination from 'src/views/components/pagination'
import Typography from 'src/views/components/typography'
import ListComponent from './listComponent'
import OrderDetails from './orderDetails'
import useOrders from './useOrders'

const Orders = () => {
  const router = useRouter()

  const { page } = router.query

  const { userOrders } = useOrders(undefined, page ? Number(page) : 0)

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage }
    })
  }

  return (
    <>
      {router.query.id ? (
        <OrderDetails />
      ) : (
        <>
          <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
            <Typography type='h3' className='mb-6'>
              ჩემი შეკვეთები
            </Typography>

            <Divider />
            {userOrders?.data?.length > 0 ? (
              userOrders?.data?.map((order: any) => (
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
          {userOrders?.last_page > 1 && (
            <Pagination totalPages={userOrders?.last_page} onPageChange={handlePageChange} currentPage={Number(page)} />
          )}
        </>
      )}
    </>
  )
}

export default Orders
