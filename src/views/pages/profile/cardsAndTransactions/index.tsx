import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import UseOrders from '../orders/useOrders'
import Transaction from './transaction'

const CardsAndTransactions = () => {
  const { userOrders } = UseOrders()

  return (
    <div className='md:p-10 md:border border-raisin-10 rounded-3xl'>
      <Typography type='h3' className='mb-6'>
        ბარათები და ტრანზაქციები
      </Typography>
      <Divider />
      {userOrders?.map((order: any) => (
        <Transaction
          key={order?.id}
          date={order?.created_at}
          id={order?.payment_order_id}
          price={order?.price}
          status={order?.status_id}
        />
      ))}
    </div>
  )
}

export default CardsAndTransactions
