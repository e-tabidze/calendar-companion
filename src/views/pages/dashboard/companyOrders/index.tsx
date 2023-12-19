import Link from 'next/link'
import { useRouter } from 'next/router'
import Divider from 'src/views/components/divider'
import Pagination from 'src/views/components/pagination'
import Tag from 'src/views/components/tag'
import Typography from 'src/views/components/typography'

import ListComponent from '../components/orderListComponent'
import OrderDetails from './orderDetails'
import SkeletonLoading from './skeletorLoading'
import useCompanyOrders from './useCompanyOrders'

const filters = [
  {
    label: 'ყველა',
    id: '1'
  },
  {
    label: 'დასრულებული',
    id: '2'
  },
  {
    label: 'მოლოდინში',
    id: '3'
  },
  {
    label: 'გაუქმებული',
    id: '4'
  },
  {
    label: 'დადასტურებული',
    id: '5'
  },
  {
    label: 'უარყოფილი',
    id: '6'
  }
]

const CompanyOrders = () => {
  const { companyOrders, companyOrdersLoading } = useCompanyOrders()

  console.log(companyOrders, 'companyOrders')

  const router = useRouter()

  if (companyOrdersLoading) {
    return <SkeletonLoading filters={filters} />
  }

  return (
    <>
      {router.query.id ? (
        <OrderDetails />
      ) : (
        <div>
          <div className='border border-raisin-10 rounded-3xl'>
            <div className='flex justify-between items-center my-4 px-2 md:px-6 2xl:px-8'>
              <Typography type='h3' className='text-md md:text-2lg'>
                შემოსული ჯავშნები
              </Typography>
            </div>
            <div className='hidden lg:flex gap-3 p-2 md:p-8'>
              {filters.map(filter => (
                <Tag label={filter.label} height='h-10' key={filter.id} className='rounded-xl' />
              ))}
            </div>
            <Divider />
            <div className='px-none md:px-6 2xl:px-8'>
              {companyOrders?.map((order: any) => (
                <Link
                  href={`/dashboard/orders/?id=${order?.id}`}
                  as={`/dashboard/orders/?id=${order?.id}`}
                  key={order?.id}
                >
                  <ListComponent
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
              ))}
            </div>
          </div>
          <Pagination totalPages={20} onPageChange={() => console.log('change Page')} currentPage={0} />
        </div>
      )}
    </>
  )
}

export default CompanyOrders
