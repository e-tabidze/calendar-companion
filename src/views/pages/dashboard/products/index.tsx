import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { Products } from 'src/types/Products'
import { IconTextButton } from 'src/views/components/button'
import SkeletonLoading from './skeletonLoading'

const Divider = dynamic(() => import('src/views/components/divider'), { ssr: false })
const Tag = dynamic(() => import('src/views/components/tag'), { ssr: false })
const Typography = dynamic(() => import('src/views/components/typography'), { ssr: false })
const Pagination = dynamic(() => import('src/views/components/pagination'), { ssr: false })
const VehicleListComponent = dynamic(() => import('src/views/pages/dashboard/components/vehicleListComponent'), {
  ssr: true
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
  const { width } = useWindowDimensions()
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
      <div className='border border-raisin-10 rounded-2xl md:px-8'>
        <div className='flex justify-between items-center my-4 px-2'>
          <Typography type='h3' className='text-md md:text-2lg'>
            ავტომობილები
          </Typography>
          <div className='flex md:hidden gap-4 md:gap-8'>
            <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon='filters' width={22} height={20} />
            <IconTextButton label={width > 779 ? 'დაჯგუფება' : ''} icon='sort' width={20} height={12} />
          </div>
        </div>
        <Divider />
        <div className='hidden lg:flex gap-3 py-8'>
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
          {companyProducts?.data?.map((product: Products) => (
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
          ))}
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
