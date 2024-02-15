import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import Divider from 'src/views/components/divider'
import Pagination from 'src/views/components/pagination'
import Typography from 'src/views/components/typography'
import useOrders from '../orders/useOrders'
import Transaction from './transaction'

const CardsAndTransactions = () => {
  const router = useRouter()

  const { page } = router.query
  const { userOrders, useUserOrdersLoading } = useOrders(undefined, page ? Number(page) : 0)

  const { t } = useTranslation()

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage }
    })
  }

  if (useUserOrdersLoading) {
    return <div>Loading</div>
  }

  return (
    <>
      <div className='md:p-10 md:border border-raisin-10 rounded-3xl mt-8 lg:mt-0'>
        <Typography type='h3' className='mb-6'>
          ტრანზაქციები
          {t('easiest_way_to_your_new_home')}
        </Typography>
        <Divider />

        {userOrders?.data?.length > 0 ? (
          userOrders?.data?.map((order: any) => (
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
      {userOrders?.last_page > 1 && (
        <Pagination totalPages={userOrders?.last_page} onPageChange={handlePageChange} currentPage={Number(page)} />
      )}
    </>
  )
}

export default CardsAndTransactions
