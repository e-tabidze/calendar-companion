import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Product } from 'src/types/Products'
import DataPlaceHolder from 'src/views/components/dataPlaceholder'
import SkeletonLoading from './skeletonLoading'

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Tag = dynamic(() => import('src/views/components/tag'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: true })
const Pagination = dynamic(() => import('src/views/components/pagination'), { ssr: false })
const VehicleListComponent = dynamic(() => import('src/views/pages/dashboard/components/vehicleListComponent'), {
  ssr: false
})

import useProducts from './useProducts'

const filters = [
  {
    label: 'ყველა',
    id: 1,
    filterOption: ''
  },
  {
    label: 'აქტიური',
    id: 2,
    filterOption: '1'
  },
  {
    label: 'გამორთული',
    id: 3,
    filterOption: '0'
  },
  {
    label: 'დაბლოკილი',
    id: 4,
    filterOption: '2'
  }
]

const Products = () => {
  const router = useRouter()
  const { is_active, page } = router.query

  const [filterQuery, setFilterQuery] = useState<'' | '0' | '1' | '2'>('')

  useEffect(() => {
    if (is_active !== undefined) {
      const activeValue = Array.isArray(is_active) ? is_active[0] : is_active
      setFilterQuery(activeValue as '' | '0' | '1' | '2')
    }
  }, [is_active])

  const { companyProducts, isLoading } = useProducts(is_active, Number(page))

  console.log(companyProducts, 'companyProducts')

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: newPage }
    })
  }

  const handleFilterChange = (newFilter: '' | '0' | '1' | '2') => {
    setFilterQuery(newFilter)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, is_active: newFilter }
    })
  }

  if (isLoading) {
    return <SkeletonLoading />
  }

  return (
    <div>
      <div className='md:p-8 lg:p-10 md:border border-raisin-10 rounded-3xl'>
        <Typography type='h3' className='mb-6 mt-8 lg:mt-0'>
          ავტომობილები
        </Typography>
        <Divider />
        <div className='flex gap-3 py-8 overflow-x-auto'>
          {filters.map(filter => (
            <Tag
              label={filter.label}
              height='h-10'
              key={filter.id}
              className={`${filter.filterOption == filterQuery ? 'border !border-orange-100' : ''} rounded-xl`}
              handleClick={() => handleFilterChange(filter.filterOption as '' | '0' | '1' | '2')}
            />
          ))}
        </div>
        <div>
          {companyProducts?.data?.length > 0 ? (
            companyProducts?.data?.map((product: Product) => (
              <VehicleListComponent
                key={product.id}
                id={product.id}
                price={product.price}
                startCity={product.start_city}
                prodYear={product.prod_year}
                model={product?.manufacturer_model?.title}
                manufacturer={product.manufacturer?.title}
                active={product.is_active}
                filter={filterQuery}
                images={product?.images}
              />
            ))
          ) : (
            <DataPlaceHolder label='ავტომობილები ჯერ არ გაქვს' />
          )}
        </div>
      </div>
      {companyProducts?.last_page > 1 && (
        <Pagination
          totalPages={companyProducts?.last_page}
          onPageChange={handlePageChange}
          currentPage={Number(page)}
        />
      )}
    </div>
  )
}

export default Products
