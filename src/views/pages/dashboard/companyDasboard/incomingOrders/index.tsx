import useProductInfo from '../../useProductInfo'
import dynamic from 'next/dynamic'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const OrderListComponent = dynamic(() => import('src/views/pages/dashboard/components/orderListComponent'), {
  ssr: false
})

const IncomingOrders = () => {
  const { t } = useTranslation()
  const { dashboardData, dashboardDataLoading } = useProductInfo()

  if (dashboardDataLoading) {
    return <div>Loading</div>
  }

  return (
    <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl'>
      <Typography type='h3' className='mb-6'>
        {t('incoming_orders')}
      </Typography>
      <Divider />
      <div>
        {dashboardData?.orders?.length > 0 ? (
          dashboardData?.orders?.map((order: any) => (
            <Link href={`/dashboard/orders/?id=${order?.id}`} as={`/dashboard/orders/?id=${order?.id}`} key={order?.id}>
              <OrderListComponent
                key={order?.id}
                startAddress={order?.start_address}
                startDate={order?.start_date}
                startTime={order?.start_time}
                endDate={order?.end_date}
                endTime={order?.end_time}
                firstName={order?.first_name}
                lastName={order?.last_name}
                days={order?.days}
                productDetails={JSON.parse(order?.product_data)}
                price={order?.price}
                discount={order?.discount_percent}
                status={order?.status_id}
              />
            </Link>
          ))
        ) : (
          <DataPlaceHolder label={t('no_orders_yet')} />
        )}
      </div>
    </div>
  )
}

export default IncomingOrders
