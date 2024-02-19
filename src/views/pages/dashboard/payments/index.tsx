import Payment from './payment'
import useCompanyOrders from 'src/views/pages/dashboard/companyOrders/useCompanyOrders'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import {useTranslation} from "next-i18next";

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Pagination = dynamic(() => import('src/views/components/pagination'), { ssr: false })

const Payments = () => {
  const {t}=useTranslation()
  const router = useRouter()

  const { page } = router.query

  const { orders, companyOrdersLoading } = useCompanyOrders('', Number(page))

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage }
    })
  }

  if (companyOrdersLoading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div className='md:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
        <Typography type='h3' className='text-md md:text-2lg mb-6'>
          {t('transactions')}
        </Typography>
        <Divider />
        {orders?.data?.length > 0 ? (
          orders?.data?.map((order: any) => (
            <Payment
              key={order?.id}
              firstName={order?.first_name}
              lastName={order.last_name}
              date={order?.created_at}
              id={order?.payment_order_id}
              price={order?.price}
              status={order?.status_id}
            />
          ))
        ) : (
          <DataPlaceHolder label={t('no_transactions_yet')} />
        )}
      </div>
      {orders?.last_page > 1 && (
        <Pagination totalPages={orders?.last_page} onPageChange={handlePageChange} currentPage={Number(page)} />
      )}
    </div>
  )
}

export default Payments
