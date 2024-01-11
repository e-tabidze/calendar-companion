import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import Divider from 'src/views/components/divider'
import Typography from 'src/views/components/typography'
import useOrders from '../orders/useOrders'
import Transaction from './transaction'

const CardsAndTransactions = () => {
  const { userOrders, useUserOrdersLoading } = useOrders()

  if (useUserOrdersLoading) {
    return <div>Loading</div>
  }

  return (
    <div className='md:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
      <Typography type='h3' className='mb-6'>
        ტრანზაქციები
      </Typography>
      <Divider />
      {userOrders?.length > 0 ? (
        userOrders?.map((order: any) => (
          <Transaction
            key={order?.id}
            date={order?.created_at}
            id={order?.payment_order_id}
            price={order?.price}
            status={order?.status_id}
          />
        ))
      ) : (
        <DataPlaceHolder label='ტრანზაქციები ჯერ არ გაქვს' />
      )}
    </div>
  )
}

export default CardsAndTransactions
