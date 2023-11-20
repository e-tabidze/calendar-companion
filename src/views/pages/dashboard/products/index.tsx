import dynamic from 'next/dynamic'
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
    id: '1'
  },
  {
    label: 'აქტიური',
    id: '2'
  },
  {
    label: 'გამორთული',
    id: '3'
  },
  {
    label: 'შენახული',
    id: '4'
  },
  {
    label: 'დაბლოკილი',
    id: '5'
  }
]
const Products = () => {
  const { width } = useWindowDimensions()
  const { companyProducts, isLoading } = useProducts()

  console.log(companyProducts, 'companyProducts')

  return (
    <div>
      <div className='border border-raisin-10 rounded-2xl md:px-8'>
        <div className='flex justify-between items-center my-4 px-2'>
          <Typography type='h3' className='text-md md:text-2lg'>
            ავტომობილები
          </Typography>
          <div className='flex md:hidden'>
            <IconTextButton label={width > 779 ? 'ფილტრი' : ''} icon={'/icons/filters.svg'} />
            <IconTextButton label={width > 779 ? 'სორტირება' : ''} icon={'/icons/sort.svg'} />
          </div>
        </div>
        <Divider />
        <div className='hidden lg:flex gap-3 mt-8'>
          {filters.map(filter => (
            <Tag label={filter.label} height='h-10' key={filter.id} className='rounded-xl' />
          ))}
        </div>
        <div>
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              {companyProducts?.map((product: Products) => (
                <VehicleListComponent
                  key={product.id}
                  price={product.price}
                  startCity={product.start_city}
                  prodYear={product.prod_year}
                  model={product?.manufacturer_model?.title}
                  manufacturer={product.manufacturer?.title}
                  active={product.is_active}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <Pagination totalPages={6} onPageChange={() => console.log('change Page')} />
    </div>
  )
}

export default Products
