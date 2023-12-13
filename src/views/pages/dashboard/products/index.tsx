import dynamic from 'next/dynamic'
import { useState } from 'react'
import useWindowDimensions from 'src/hooks/useWindowDimensions'
import { Products } from 'src/types/Products'
import { IconTextButton } from 'src/views/components/button'
import Divider from 'src/views/components/divider'
import Tag from 'src/views/components/tag'
import Typography from 'src/views/components/typography'

const Pagination = dynamic(() => import('src/views/components/pagination'), { ssr: false })
const VehicleListComponent = dynamic(() => import('src/views/pages/dashboard/components/vehicleListComponent'), {
  ssr: true
})

import useProducts from './useProducts'

const filters = [
  {
    label: 'ყველა',
    id: '1',
    filterOption: ''
  },
  {
    label: 'აქტიური',
    id: '2',
    filterOption: 1
  },
  {
    label: 'გამორთული',
    id: '3',
    filterOption: 0
  },
  {
    label: 'დაბლოკილი',
    id: '4',
    filterOption: 2
  }
]
const Products = () => {
  const { width } = useWindowDimensions()
  const [filterQuery, setFilterQuery] = useState<'' | 0 | 1 | 2>('')
  const { companyProducts, isLoading } = useProducts(filterQuery)

  console.log(companyProducts, 'companyProducts')

  return (
    <div>
      <div className='border border-raisin-10 rounded-2xl md:px-8'>
        <div className='flex justify-between items-center my-4 px-2'>
          <Typography type='h3' className='text-md md:text-2lg'>
            ავტომობილები
          </Typography>
          <div className='flex md:hidden gap-4 md:gap-8'>
            <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon='filters' width={22} height={20} />
            <IconTextButton label={width > 779 ? 'სორტირება' : ''} icon='sort' width={20} height={12} />
          </div>
        </div>
        <Divider />
        <div className='hidden lg:flex gap-3 py-8'>
          {filters.map(filter => (
            <Tag
              label={filter.label}
              height='h-10'
              key={filter.id}
              className={`${filter.filterOption === filterQuery ? 'border !border-orange-100' : ''} rounded-xl`}
              handleClick={() => setFilterQuery(filter.filterOption as '' | 0 | 1 | 2)}
            />
          ))}
        </div>
        <div>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <Pagination totalPages={6} onPageChange={() => console.log('change Page')} currentPage={0} />
    </div>
  )
}

export default Products
