import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Icon from 'src/views/app/Icon'
import useCompanyOrders from './useCompanyOrders'

const Pagination = dynamic(() => import('src/views/components/pagination'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: true })
const Tag = dynamic(() => import('src/views/components/tag'), { ssr: false })
const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const OrderListComponent = dynamic(() => import('src/views/pages/dashboard/components/orderListComponent'), {
  ssr: false
})
const OrderDetails = dynamic(() => import('./orderDetails'), { ssr: false })

const filters = [
  {
    label: 'ყველა',
    id: '1',
    filterOption: ''
  },
  {
    label: 'მოლოდინში',
    id: '3',
    filterOption: '0'
  },
  {
    label: 'გაუქმებული',
    id: '4',
    filterOption: '2'
  },
  {
    label: 'დადასტურებული',
    id: '5',
    filterOption: '1'
  },
  {
    label: 'თვითდაჯავშნილი',
    id: '7',
    filterOption: '5'
  }
]

const CompanyOrders = () => {
  const router = useRouter()
  const { status_id, page } = router.query

  const [filterQuery, setFilterQuery] = useState<'' | '0' | '1' | '2' | '5'>('')

  useEffect(() => {
    if (status_id !== undefined) {
      const activeValue = Array.isArray(status_id) ? status_id[0] : status_id
      setFilterQuery(activeValue as '' | '0' | '1' | '2' | '5')
    }
  }, [status_id])

  const { orders, fetchOrderFilters } = useCompanyOrders(status_id, Number(page))

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage }
    })
  }

  const handleFilterChange = (newFilter: '' | '0' | '1' | '2' | '5') => {
    setFilterQuery(newFilter)
    fetchOrderFilters
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, status_id: newFilter }
    })
  }

  const handleClickFilter = () => {
    fetchOrderFilters()
  }

  // if (companyOrdersLoading) {
  //   return <SkeletonLoading filters={filters} />
  // }

  console.log(orders?.data, 'orders?.data')

  return (
    <>
      {router.query.id ? (
        <OrderDetails />
      ) : (
        <div className='h-full'>
          <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl md:min-h-[520px]'>
            <Typography type='h3' className='mb-6 md:mt-0 mt-6'>
              შემოსული ჯავშნები 
            </Typography>
            <div className='hidden lg:flex gap-3 pb-8 pr-8'>
              {filters.map(filter => (
                <Tag
                  label={filter.label}
                  height='h-10'
                  key={filter.id}
                  className={`${filter.filterOption == filterQuery ? 'border !border-orange-100' : ''} rounded-xl`}
                  handleClick={() => {
                    handleFilterChange(filter.filterOption as '' | '0' | '1' | '2' | '5')
                    handleClickFilter()
                  }}
                />
              ))}
            </div>

            <Divider />
            <div className=''>
              {orders?.data.length > 0 ? (
                orders?.data?.map((order: any, index: number) => (
                  <Link
                    href={`/dashboard/orders/?id=${order?.id}`}
                    as={`/dashboard/orders/?id=${order?.id}`}
                    key={order?.id}
                  >
                    <OrderListComponent
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

                    {index !== orders?.data?.length - 1 && <Divider />}
                  </Link>
                ))
              ) : (
                <div className='flex flex-col justify-center my-6 items-center gap-5'>
                  <Icon svgPath='noOrders' width={207} height={156} />
                  <Typography type='h5'>შეკვეთები ჯერ არ გაქვს</Typography>
                </div>
              )}
            </div>
          </div>

          {orders?.last_page > 1 && (
            <Pagination totalPages={orders?.last_page} onPageChange={handlePageChange} currentPage={Number(page)} />
          )}
        </div>
      )}
    </>
  )
}

export default CompanyOrders
