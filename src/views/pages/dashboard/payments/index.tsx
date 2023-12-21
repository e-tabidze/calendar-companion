import Payment from './payment'
import useCompanyOrders from 'src/views/pages/dashboard/companyOrders/useCompanyOrders'
import dynamic from 'next/dynamic'

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })

const Payments = () => {
  const { companyOrders } = useCompanyOrders()

  return (
    <div className='md:p-10 md:border border-raisin-10 rounded-3xl'>
      <Typography type='h3' className='text-md md:text-2lg mb-6'>
        ბარათები და ტრანზაქციები
      </Typography>
      <Divider />
      {companyOrders?.map((order: any) => (
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
    </div>
  )
}

export default Payments
