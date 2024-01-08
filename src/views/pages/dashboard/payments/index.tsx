import Payment from './payment'
import useCompanyOrders from 'src/views/pages/dashboard/companyOrders/useCompanyOrders'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Pagination = dynamic(() => import('src/views/components/pagination'), { ssr: false })

const Payments = () => {
  const router = useRouter()

  const { page } = router.query

  const { orders } = useCompanyOrders('', Number(page))

  console.log(orders, 'companyOrders')

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage }
    })
  }

  return (
    <div className='md:p-10 md:border border-raisin-10 rounded-3xl'>
      <Typography type='h3' className='text-md md:text-2lg mb-6'>
        ტრანზაქციები
      </Typography>
      <Divider />
      {orders?.data?.map((order: any) => (
        <Payment
          key={order?.id}
          firstName={order?.first_name}
          lastName={order.last_name}
          date={order?.created_at}
          id={order?.payment_order_id}
          price={order?.price}
          status={order?.status_id}
        />
      ))}

      {orders?.last_page > 1 && (
        <Pagination totalPages={orders?.last_page} onPageChange={handlePageChange} currentPage={Number(page)} />
      )}
    </div>
  )
}

export default Payments
